import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeComponent } from './income.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income.service';
import { Income } from 'src/app/models/income';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

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
            incomeNameGroupId: "รายได้เสริม",
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

  
});
