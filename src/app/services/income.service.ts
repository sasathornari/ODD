import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../models/income';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  getIncomeByUserId(): Observable<Income[]>{
    return this.http.get<Income[]>('http://103.74.254.157:9003/income/id/1');    
  }
}
