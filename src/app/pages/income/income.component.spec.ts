import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';
import { spawn } from 'child_process';

describe('IncomeComponent', () => {
  let component: IncomeComponent;
  let fixture: ComponentFixture<IncomeComponent>;
  let incomeService: IncomeService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeComponent ],
      imports: [
        ModalModule.forRoot(),
        HttpClientModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeComponent);
    component = fixture.componentInstance;
    incomeService = TestBed.inject(IncomeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  

  describe('getIncomeUserById', () => {
    let expected: Income[];

    beforeEach(() => {

      expected = 
      [
          {
            id: 1,
            incomeGroupId: 2,
            incomeGroupName: "รายได้เสริม",
            amount: 2999,
            date: "2012-04-23T18:25:44Z"
          }
      ] as Income[];
      spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of(expected));
    })

    it('should be called getIncomeByUserId service when call ngOnInit', () => {
      //spyOn(incomeService, 'getIncomeByUserId').and.returnValue(of([]));
  
      component.ngOnInit();
      expect(incomeService.getIncomeByUserId).toHaveBeenCalled();
    })

    it('should be add data to incomes when call getIncomeByUserId is success', () => {    
      
      component.ngOnInit();
      expect(component.incomes).toEqual(expected);       
    })
  })

  

  describe('create reactive form', () => {
    it('should be checked value empty in date of form', () => {
      component.ngOnInit();
  
      expect(component.incomeForm.controls.date.value).toBe('');
    })
  
    it('should be checked value empty income group id of form', () => {
      component.ngOnInit();
  
      expect(component.incomeForm.controls.incomeGroupId.value).toBe('');
    })
  
    it('should be checked value empty amount of form', () => {
      component.ngOnInit();
  
      expect(component.incomeForm.controls.amount.value).toBe('');
    })
  })

  it('should be called method getIncomeGroup when call ngOnInit', () => {
    spyOn(incomeService,'getIncomeGroup').and.returnValue(of([]));
    component.ngOnInit();

    expect(incomeService.getIncomeGroup).toHaveBeenCalled()
  });

  it('should be set data of IncomeGroup when call getIncomeGroup api is success', () => {
    const expected = [
      {
        "id": 1,
        "name": "เงินเดือน"
      },
      {
          "id": 2,
          "name": "รายได้เสริม"
      }
    ] as IncomeGroup[];

    spyOn(incomeService, 'getIncomeGroup').and.returnValue(of(expected));
    component.ngOnInit();

    expect(component.incomeGroup).toBe(expected);
  })

  it('should be called method saveIncome when click submit', () => {
    
    component.incomeForm.get('date').setValue('12/31/2019');
    component.incomeForm.get('incomeGroupId').setValue('3');
    component.incomeForm.get('amount').setValue('50000')
    
    spyOn(incomeService, 'saveIncome').and.returnValue(of([]));
    spyOn(component, 'getDateISOString').and.returnValue('2012-04-23T18:25:44Z');
    const expected = {
      amount: 50000,
      date: '2012-04-23T18:25:44Z',
      incomeGroupId: 3
    } as IncomeRequest;

    component.onSubmit();
    expect(incomeService.saveIncome).toHaveBeenCalledWith(expected);
  })

  it('should be get income when called save income success', () => {
    component.incomeForm.get('date').setValue('12/31/2019');
    component.incomeForm.get('incomeGroupId').setValue('3');
    component.incomeForm.get('amount').setValue('50000')
    
    spyOn(incomeService, 'saveIncome').and.returnValue(of([]));
    spyOn(component, 'getDateISOString').and.returnValue('2012-04-23T18:25:44Z');
    spyOn(component, 'getIncomeByUserId');
    
    component.onSubmit();
    expect(component.getIncomeByUserId).toHaveBeenCalled();
  })
  
});
