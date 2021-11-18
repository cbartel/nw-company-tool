import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeNavigationComponent } from './components/home-navigation/home-navigation.component';
import { NavigationModule } from '../../services/navigation/navigation.module';
import { HomeComponent } from './routes/root/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [HomeRoutingModule, NavigationModule, MatCardModule, MatIconModule, CommonModule],
  declarations: [HomeComponent, HomeNavigationComponent],
  providers: [],
  exports: []
})
export class HomePageModule {}
