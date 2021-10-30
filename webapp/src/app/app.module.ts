import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { NgcCookieConsentConfig, NgcCookieConsentModule, NgcCookieConsentService } from 'ngx-cookieconsent';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeIconComponent } from './components/home-icon/home-icon.component';
import { AccountDisabledComponent } from './pages/account-disabled/account-disabled.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { AdminComponent } from './pages/admin/admin.component';
import { UserModule } from './services/user/user.module';
import { ConfigModule } from './services/config/config.module';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { CompanyComponent } from './pages/company/company.component';
import { CompanyModule } from './services/company/company.module';
import { MatTableModule } from '@angular/material/table';
import { MyCharacterComponent } from './pages/my-character/my-character.component';
import { ConfigService } from './services/config/config.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CharactersTableComponent } from './components/characters-table/characters-table.component';
import { AdminUsersTableComponent } from './components/admin-users-table/admin-users-table.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { HomeNavigationComponent } from './components/home-navigation/home-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationModule } from './services/navigation/navigation.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminModule } from './services/admin/admin.module';
import { MyCharacterAttributesComponent } from './components/my-character-attributes/my-character-attributes.component';
import { MyCharacterWeaponMasteryComponent } from './components/my-character-weapon-mastery/my-character-weapon-mastery.component';
import { MyCharacterTradeSkillsComponent } from './components/my-character-trade-skills/my-character-trade-skills.component';
import { AttributeComponent } from './components/attribute/attribute.component';
import { CharacterModule } from './services/character/character.module';
import { AfterValueChangedDirective } from './directives/after-value-changed.directive';
import { WeaponMasteryComponent } from './components/weapon-mastery/weapon-mastery.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TradeSkillComponent } from './components/trade-skill/trade-skill.component';
import { ReactiveFormsModule } from '@angular/forms';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeIconComponent,
    AccountDisabledComponent,
    ForbiddenComponent,
    AdminComponent,
    CompanyComponent,
    MyCharacterComponent,
    CharactersTableComponent,
    AdminUsersTableComponent,
    HomeNavigationComponent,
    MyCharacterAttributesComponent,
    MyCharacterWeaponMasteryComponent,
    MyCharacterTradeSkillsComponent,
    AttributeComponent,
    AfterValueChangedDirective,
    WeaponMasteryComponent,
    TradeSkillComponent
  ],
  imports: [
    NgcCookieConsentModule.forRoot(cookieConfig),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    NavigationModule,
    AdminModule,
    UserModule,
    ConfigModule,
    CompanyModule,
    CharacterModule
  ],
  providers: [LoginGuard, AdminGuard],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
  constructor(private ccService: NgcCookieConsentService, private configService: ConfigService) {}
}
