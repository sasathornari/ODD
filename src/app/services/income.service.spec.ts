import { TestBed } from '@angular/core/testing';

import { IncomeService } from './income.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';


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
    const req = httpTestingController.expectOne('http://103.74.254.157:9003/income/id/1')

    // Hope
    expect(req.request.method).toBe('GET');
  })

  
});
