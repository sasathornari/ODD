import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';
import { HttpClient } from '@angular/common/http';
import { IncomeService } from 'src/app/services/income.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  ngOnInit() {
    this.incomeService.getIncomeByUserId()
    .subscribe( (incomes: Income[]) => {
      this.incomes = incomes;
    });

    this.incomeForm = this.fb.group({
      date: '',
      incomeGroupId: '',
      amount: ''
    })
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
