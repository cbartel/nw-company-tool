import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput, FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { ExpeditionService } from '../../../../services/expedition/expedition.service';
import { first, map, mergeMap } from 'rxjs/operators';
import { EventClickArg, EventSourceInput } from '@fullcalendar/core';
import { CalendarEventType, Expedition } from '@nw-company-tool/model';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './home-calendar.component.html',
  styleUrls: ['./home-calendar.component.css']
})
export class HomeCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  options: CalendarOptions = {
    initialDate: moment().format('yyyy-MM-DD'),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridWeek,dayGridMonth'
    },
    footerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    initialView: 'dayGridWeek',
    nowIndicator: true,
    aspectRatio: 2,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    firstDay: 1,
    locale: navigator.language,
    eventClassNames: 'calendar-event',
    eventClick: this.handleEventClick.bind(this),
    eventSources: [this.getExpeditions()]
  };

  updateSubscription: Subscription;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(
    private expeditionService: ExpeditionService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.expeditionService.refreshExpeditions();
  }

  ngAfterViewInit(): void {
    this.updateSubscription = this.expeditionService
      .getExpeditions()
      .subscribe(() => this.calendarComponent.getApi().refetchEvents());
  }

  ngOnDestroy(): void {
    this.updateSubscription?.unsubscribe();
  }

  private handleEventClick(info: EventClickArg): void {
    if (info.event.extendedProps.type === CalendarEventType.EXPEDITION) {
      this.router.navigate(['expedition']);
    }
  }

  private getExpeditions(): EventSourceInput {
    return {
      color: 'yellow',
      events: (info, success) => {
        this.expeditionService
          .getExpeditions()
          .pipe(
            first(),
            map((expeditions) => expeditions.map((expedition) => HomeCalendarComponent.mapExpedition(expedition))),
            mergeMap((events) => {
              return new Observable<EventInput[]>((observer) => {
                Promise.all(
                  events.map(async (event) => {
                    event.title = await this.translate.get(`EXPEDITION.${event.title}`).toPromise();
                    return event;
                  })
                ).then((result) => {
                  observer.next(result);
                  observer.complete();
                });
              });
            })
          )
          .subscribe((events) => success(events));
      }
    };
  }

  private static mapExpedition(expedition: Expedition): EventInput {
    return {
      title: expedition.name,
      start: expedition.beginDateTime,
      extendedProps: {
        type: CalendarEventType.EXPEDITION
      }
    };
  }
}
