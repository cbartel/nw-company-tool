import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import * as moment from 'moment';
import { ExpeditionService } from '../../../../services/expedition/expedition.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home-calendar',
  templateUrl: './home-calendar.component.html',
  styleUrls: ['./home-calendar.component.css']
})
export class HomeCalendarComponent {
  options: CalendarOptions = {
    initialDate: moment().format('yyyy-MM-DD'),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    footerToolbar: {
      left: '',
      center: '',
      right: ''
    },
    aspectRatio: 2,
    editable: false,
    selectable: false,
    selectMirror: true,
    dayMaxEvents: true,
    firstDay: 1,
    locale: navigator.language,
    eventSources: [
      {
        color: 'yellow',
        events: (info, success) => {
          this.expeditionService
            .getExpeditions()
            .pipe(
              map((expeditions) =>
                expeditions.map((expedition) => ({
                  title: expedition.name,
                  start: expedition.beginDateTime
                }))
              )
            )
            .subscribe((events) => success(events));
        }
      }
    ]
  };

  constructor(private expeditionService: ExpeditionService) {}
}
