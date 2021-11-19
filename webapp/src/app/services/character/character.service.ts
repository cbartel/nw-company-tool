import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attribute, AttributeQuery, AttributeUpdate, Character, CharacterBase } from '@nw-company-tool/model';

@Injectable({ providedIn: 'root' })
export class CharacterService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<CharacterBase[]> {
    return this.http.get<Character[]>('/api/character/all', { withCredentials: true });
  }

  public findById(userId: number): Observable<Character> {
    return this.http.get<Character>(`/api/character/${userId}`, { withCredentials: true });
  }

  public query(query: AttributeQuery): Observable<Character[]> {
    return this.http.post<Character[]>('/api/character/attributes/query', query, { withCredentials: true });
  }

  public updateAttribute(attribute: Attribute, value: string): Observable<unknown> {
    const payload: AttributeUpdate = {
      attribute,
      value
    };
    return this.http.put(`/api/character/me/attributes`, payload, { withCredentials: true });
  }
}
