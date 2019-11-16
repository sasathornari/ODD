import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Income } from 'src/app/models/income';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  constructor(private modalService: BsModalService) { }
  modalRef: BsModalRef;
  income: Income;

  ngOnInit() {
    this.income = {
      id: 12,
      incomeGroupId: 2,
      incomeNameGroupId: "รายได้เสริม",
      amount: 200,
      date: "2012-04-23T18:25:44Z"
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
