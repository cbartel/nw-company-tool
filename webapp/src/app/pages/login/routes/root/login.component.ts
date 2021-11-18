import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  login(): void {
    //TODO remove this to service !
    this.http.get<any>('/api/login/loginurl').subscribe(({ loginUrl }) => {
      window.open(loginUrl, '_self');
    });
  }
}
