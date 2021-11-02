import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Attribute,
  Character,
  CharacterAttributes,
  CharacterQuery,
  CharacterWithPartialAttributes
} from '@model/character.model';

@Injectable()
export class CharacterService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<Character[]> {
    return this.http.get<Character[]>('/api/characters/all', { withCredentials: true });
  }

  public query(query: CharacterQuery): Observable<CharacterWithPartialAttributes[]> {
    return this.http.post<CharacterWithPartialAttributes[]>('/api/characters/all', query, { withCredentials: true });
  }

  public getAllAttributesForUser(userId: number): Observable<CharacterAttributes> {
    return this.http.get<CharacterAttributes>(`/api/characters/attributes/${userId}`, { withCredentials: true });
  }

  public getAllAttributes(): Observable<CharacterAttributes> {
    return this.http.get<CharacterAttributes>('/api/characters/attributes/me', { withCredentials: true });
  }

  public updateAttribute(attribute: Attribute, value: number): void {
    this.http.post(`/api/characters/attributes/me/${attribute}`, { value }, { withCredentials: true }).subscribe();
  }
}
