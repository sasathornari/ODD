import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../models/income';
import { IncomeGroup } from '../models/income-group';
import { IncomeRequest } from '../models/income-request';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  SERVER_URL: string;
  USER_ID: number;

  constructor(private http: HttpClient) { 
    this.SERVER_URL = 'https://working-with-angular.herokuapp.com';
    this.USER_ID = 25;
  }

  getIncomeByUserId(): Observable<Income[]>{
    return this.http.get<Income[]>(`${this.SERVER_URL}/income/id/${this.USER_ID}`);    
  }

  getIncomeGroup(): Observable<IncomeGroup[]>{
    return this.http.get<IncomeGroup[]>(`${this.SERVER_URL}/income/group`);
  }b

  saveIncome(income: IncomeRequest){
    income.userId = this.USER_ID;
    return this.http.post(`${this.SERVER_URL}/income`, income);
  }

  updateIncome(id: number, data: IncomeRequest){
    data.userId = 25;
    return this.http.put(`${this.SERVER_URL}/income/id/${id}`, data);
  }
}
