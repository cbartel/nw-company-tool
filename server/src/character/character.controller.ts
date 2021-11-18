import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RequiredPermissions } from '../login/login.decorator';
import { CharacterService } from './character.service';
import { Character, Permission } from '@nw-company-tool/model';
import { AttributeQueryDto } from './dto/attribute.query.dto';
import { Request } from '../app.model';
import { AttributeUpdateDto } from './dto/attribute.update.dto';

@Controller('/api/character')
@RequiredPermissions(Permission.ENABLED)
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('/attributes/query')
  async attributeQueryAllCharacters(@Body() query: AttributeQueryDto): Promise<Character[]> {
    return this.characterService.queryAttributes(query.attributes);
  }

  @Get('/me')
  async getCharacter(@Req() request: Request): Promise<Character> {
    return this.characterService.getCharacterByUserId(request.user.id);
  }

  @Get('/:id')
  async getCharacterById(@Param('id') id: string): Promise<Character> {
    return this.characterService.getCharacterByUserId(+id);
  }

  @Put('/me/attributes')
  async updateCharacterAttributes(@Req() request: Request, @Body() update: AttributeUpdateDto): Promise<void> {
    return this.characterService.updateAttributes(request.user.id, update.attribute, update.value);
  }
}
