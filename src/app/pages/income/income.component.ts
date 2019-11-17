import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IncomeGroup } from 'src/app/models/income-group';
import { IncomeRequest } from 'src/app/models/income-request';
import { debounceTime, distinct, distinctUntilChanged, switchMap, map, filter } from 'rxjs/operators';
import { Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    private http: HttpClient,
    private incomeService: IncomeService,
    private fb: FormBuilder
    ) { }

  modalRef: BsModalRef;
  incomes: Income[];
  incomeForm: FormGroup;
  incomeGroup: IncomeGroup[];
  searchText = new FormControl();
  subscription = new Subscription();

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    
    this.getIncomeByUserId();
    this.createForm();
    this.getIncomeGroup();
    
    this.searchText.valueChanges
     .pipe(
       filter(v => v.lenght !== 0),
       debounceTime(500),
       distinctUntilChanged(),
       switchMap(v => this.incomeService.findIncome(v))
     )
     .subscribe(v => {
       console.log(v);
       this.incomes = v.map(n => ({...n, incomeGroupName: n.incomeNameGroupId }));
     });

    
  }

  onSubmit(){
    const data = {
      amount: Number(this.incomeForm.get('amount').value),
      date: this.getDateISOString(this.incomeForm.get('date').value),
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value)
    } as IncomeRequest;
    this.incomeService.saveIncome(data)
    .subscribe(_=>{
      //console.log('success');
      this.getIncomeByUserId();
      //this.modalRef.hide();
    });
    
  }

  getDateISOString(date: string): string {
    return new Date(date).toISOString();
  }
  createForm(){
    this.incomeForm = this.fb.group({
      date: '',
      incomeGroupId: '',
      amount: ''
    })
  }

  getIncomeByUserId(){
    this.incomeService.getIncomeByUserId()
    .subscribe( (incomes: Income[]) => {
      this.incomes = incomes;
    });
  }

  getIncomeGroup(){
    this.incomeService.getIncomeGroup().subscribe(incomeGroup => {
      this.incomeGroup = incomeGroup;
    });
    
  }

  openModal(template: TemplateRef<any>, income?: Income) {
    this.modalRef = this.modalService.show(template);
    if(income){
      this.incomeForm.get('date').setValue(income.date);
      this.incomeForm.get('amount').setValue(String(income.amount));
      this.incomeForm.get('incomeGroupId').setValue(String(income.incomeGroupId));
    }else {
      this.incomeForm.get('date').setValue('');
      this.incomeForm.get('amount').setValue('');
      this.incomeForm.get('incomeGroupId').setValue('');
    }
    
  }

  edit(income: Income){
    
    const data = {
      amount: Number(this.incomeForm.get('amount').value),
      date: this.getDateISOString(this.incomeForm.get('date').value),
      incomeGroupId: Number(this.incomeForm.get('incomeGroupId').value)
    } as IncomeRequest;
    this.incomeService.updateIncome(income.id,data);
  }
}
