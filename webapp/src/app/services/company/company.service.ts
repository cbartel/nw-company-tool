import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Character} from "@model/character.model";

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Character[]> {
    return this.http.get<Character[]>('/api/company/characters', { withCredentials: true });
  }
}
