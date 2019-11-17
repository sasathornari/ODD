import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { IncomeRequest } from '../models/income-request';


describe('IncomeService', () => {
  let service: IncomeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IncomeService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be called method get with url of income api', () => {
    // Call Results;
    service.getIncomeByUserId().subscribe();
    const req = httpTestingController.expectOne(`${service.SERVER_URL}/income/id/1`)

    // Hope
    expect(req.request.method).toBe('GET');
  })

  it('should be return data income group when call method getIncomeGroup', () => {
    service.getIncomeGroup().subscribe();

    const req = httpTestingController.expectOne(`${service.SERVER_URL}/income/group`);
    expect(req.request.method).toBe('GET');
  })

  it('should be called method POS with url of save income api', () => {
    const dataRequest = {
      amount: 50000,
      date: '12/31/2019',
      incomeGroupId: 3
    } as IncomeRequest;
    service.saveIncome(dataRequest).subscribe();
    const req = httpTestingController.expectOne(`${service.SERVER_URL}/income`);
    expect(req.request.method).toBe('POST'); 
  })
  
  it('should be set income request body with user id when call method save income', () => {
    const dataRequest = {
      amount: 50000,
      date: '12/31/2019',
      incomeGroupId: 3
    } as IncomeRequest;

    const expected = {
      userId: 25,
      amount: 50000,
      date: '12/31/2019',
      incomeGroupId: 3
    } as IncomeRequest;
    service.saveIncome(dataRequest).subscribe();

    const req = httpTestingController.expectOne(`${service.SERVER_URL}/income`);
    expect(req.request.body).toEqual(expected); 
  })
});
