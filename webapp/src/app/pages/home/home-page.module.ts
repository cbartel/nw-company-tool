import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeNavigationComponent } from './components/home-navigation/home-navigation.component';
import { NavigationModule } from '../../services/navigation/navigation.module';
import { HomeComponent } from './routes/root/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HomeCalendarComponent } from './components/home-calendar/home-calendar.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FullCalendarModule as NgFullCalendarModule } from 'primeng/fullcalendar';

@NgModule({
  imports: [
    HomeRoutingModule,
    NavigationModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatDatepickerModule,
    FullCalendarModule,
    CalendarModule,
    FullCalendarModule,
    NgFullCalendarModule
  ],
  declarations: [HomeComponent, HomeNavigationComponent, HomeCalendarComponent],
  providers: [],
  exports: []
})
export class HomePageModule {}
