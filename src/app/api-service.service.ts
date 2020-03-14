import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) {
  }

  getCitiesFromApi(input): Observable<any[]> {
    return this.http.get<any[]>(`https://jsonmock.hackerrank.com/api/cities/?city=${input.input}`)
  }
}
