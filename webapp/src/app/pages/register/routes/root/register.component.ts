import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { CreateUser } from '@nw-company-tool/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  characterName = new FormControl('');

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {}

  register(): void {
    const payload: CreateUser = {
      characterName: this.characterName.value
    };

    const sub = this.http.post<unknown>('/api/login/register', payload, { withCredentials: true }).subscribe(() => {
      this.userService.login();
      this.router.navigate(['/']);
      sub.unsubscribe();
    });
  }
}
