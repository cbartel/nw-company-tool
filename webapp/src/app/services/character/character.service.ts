import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Attribute, CharacterAttributes} from "@model/character.model";

@Injectable()
export class CharacterService {
  constructor(private http: HttpClient) {}

  public getAllAttributes(): Observable<CharacterAttributes> {
    return this.http.get<CharacterAttributes>('/api/character/attributes', { withCredentials: true });
  }

  public updateAttribute(attribute: Attribute, value: number): void {
    this.http.post(`/api/character/attributes/${attribute}`, { value }, { withCredentials: true }).subscribe();
  }
}
