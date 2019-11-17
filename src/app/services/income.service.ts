import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../models/income';
import { IncomeGroup } from '../models/income-group';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  SERVER_URL: string;

  constructor(private http: HttpClient) { 
    this.SERVER_URL = 'https://working-with-angular.herokuapp.com';
  }

  getIncomeByUserId(): Observable<Income[]>{
    return this.http.get<Income[]>(`${this.SERVER_URL}/income/id/1`);    
  }

  getIncomeGroup(): Observable<IncomeGroup[]>{
    return this.http.get<IncomeGroup[]>(`${this.SERVER_URL}/income/group`);
  }
}
