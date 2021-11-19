import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http: HttpClient) {}

  login(): void {
    //TODO remove this to service !
    this.http.get<any>('/api/login/loginurl').subscribe(({ loginUrl }) => {
      window.open(loginUrl, '_self');
    });
  }
}
