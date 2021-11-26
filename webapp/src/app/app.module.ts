import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgcCookieConsentConfig, NgcCookieConsentModule, NgcCookieConsentService } from 'ngx-cookieconsent';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { ConfigService } from './services/config/config.service';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule, TranslateModuleConfig } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigModule } from './services/config/config.module';
import { PluginModule } from './services/plugin/plugin.module';
import { UserModule } from './services/user/user.module';
import { NavigationModule } from './services/navigation/navigation.module';
import { AdminModule } from './services/admin/admin.module';
import { CharacterModule } from './services/character/character.module';
import { SnackbarModule } from './services/snackbar/snackbar.module';
import { InterceptorModule } from './interceptor/interceptor.module';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ExpeditionModule } from './services/expedition/expedition.module';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: ''
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'classic',
  type: 'info'
};

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

const i18nConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  },
  defaultLanguage: 'en'
};

FullCalendarModule.registerPlugins([dayGridPlugin, timeGridPlugin, interactionPlugin]);

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    TranslateModule.forRoot(i18nConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InterceptorModule,
    ConfigModule,
    PluginModule,
    AdminModule,
    CharacterModule,
    ConfigModule,
    ExpeditionModule,
    NavigationModule,
    PluginModule,
    SnackbarModule,
    UserModule,
    NavigationModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatMomentDateModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'en-GB' }, AppComponent, LoginGuard, AdminGuard],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
  constructor(private ccService: NgcCookieConsentService, private configService: ConfigService) {}
}
