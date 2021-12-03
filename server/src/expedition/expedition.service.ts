import { HttpException, Injectable } from '@nestjs/common';
import {
  CreateExpedition,
  Expedition,
  ExpeditionCreateEvent,
  ExpeditionDeleteEvent,
  ExpeditionJoinEvent,
  ExpeditionLeaveEvent,
  JoinExpedition,
  LeaveExpedition,
  Participant,
  Role,
  User,
} from '@nw-company-tool/model';
import { ExpeditionParticipant } from '@prisma/client';
import { DatabaseClient } from '../database/database.client';
import { EventService } from '../event/event.service';

type ExpeditionQueryResult = {
  id: number;
  name: string;
  beginDateTime: Date;
  User: User;
  ExpeditionParticipant: (ExpeditionParticipant & { User: User })[];
};

@Injectable()
export class ExpeditionService {
  constructor(private client: DatabaseClient, private eventService: EventService) {}

  findAll(): Promise<Expedition[]> {
    return this.client.expedition
      .findMany({
        select: {
          id: true,
          name: true,
          beginDateTime: true,
          User: true,
          ExpeditionParticipant: {
            include: {
              User: true,
            },
          },
        },
      })
      .then((results) => results.map((result) => this.mapToExpedition(result)));
  }

  async findById(id: number): Promise<Expedition> {
    return this.client.expedition
      .findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          beginDateTime: true,
          User: true,
          ExpeditionParticipant: {
            include: {
              User: true,
            },
          },
        },
      })
      .then((result) => this.mapToExpedition(result));
  }

  async findParticipants(id: number): Promise<Participant[]> {
    return this.client.expeditionParticipant
      .findMany({
        include: {
          User: true,
        },
        where: {
          expeditionId: id,
        },
      })
      .then((participants) => participants.map((participant) => ExpeditionService.mapToParticipant(participant)));
  }

  async join(user: User, expeditionJoin: JoinExpedition): Promise<void> {
    const participants = await this.findParticipants(expeditionJoin.id);
    const roles = participants.filter((participant) => participant.role === expeditionJoin.role);
    switch (expeditionJoin.role) {
      case Role.DAMAGE: {
        if (roles.length >= 3) throw new HttpException('expedition is full', 400);
        break;
      }
      case Role.TANK:
      case Role.HEAL: {
        if (roles.length >= 1) throw new HttpException('expedition is full', 400);
        break;
      }
    }
    await this.client.expeditionParticipant.create({
      data: {
        userId: user.id,
        expeditionId: expeditionJoin.id,
        hasTuningOrb: expeditionJoin.hasTuningOrb,
        role: expeditionJoin.role,
      },
    });
    const expedition = await this.findById(expeditionJoin.id);
    this.eventService.emit(new ExpeditionJoinEvent(expedition));
  }

  async leave(user: User, expeditionLeave: LeaveExpedition): Promise<void> {
    await this.client.expeditionParticipant.delete({
      where: {
        expeditionId_userId: {
          userId: user.id,
          expeditionId: expeditionLeave.id,
        },
      },
    });
    const expedition = await this.findById(expeditionLeave.id);
    this.eventService.emit(new ExpeditionLeaveEvent(expedition));
  }

  async create(user: User, expeditionData: CreateExpedition): Promise<void> {
    const createResult = await this.client.expedition.create({
      data: {
        name: expeditionData.name,
        beginDateTime: expeditionData.beginDateTime,
        User: {
          connect: {
            id: user.id,
          },
        },
        ExpeditionParticipant: {
          create: {
            userId: user.id,
            hasTuningOrb: expeditionData.hasTuningOrb,
            role: expeditionData.role,
          },
        },
      },
    });
    const expedition = await this.findById(createResult.id);
    this.eventService.emit(new ExpeditionCreateEvent(expedition));
  }

  async delete(id: number): Promise<void> {
    await this.client.expedition.delete({
      where: {
        id,
      },
    });
    this.eventService.emit(new ExpeditionDeleteEvent(id));
  }

  private mapToExpedition(result: ExpeditionQueryResult): Expedition {
    return {
      id: result.id,
      name: result.name,
      beginDateTime: result.beginDateTime.toISOString(),
      owner: {
        userId: result.User.id,
        characterName: result.User.characterName,
        discordId: result.User.discordId,
      },
      participants: result.ExpeditionParticipant.map((participant) => ExpeditionService.mapToParticipant(participant)),
    };
  }

  private static mapToParticipant(participant: ExpeditionParticipant & { User: User }): Participant {
    return {
      userId: participant.User.id,
      characterName: participant.User.characterName,
      discordId: participant.User.discordId,
      role: participant.role as Role,
      hasTuningOrb: participant.hasTuningOrb,
    };
  }
}
