import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InCome } from './../../../../../service/income.service';
import { Debt_LoanSevice } from './../../../../../service/debt-loan.service';
import { Expense } from './../../../../../service/expense.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-category-transfer-money',
  templateUrl: './choose-category-transfer-money.component.html',
  styleUrls: ['./choose-category-transfer-money.component.scss']
})
export class ChooseCategoryTransferMoneyComponent implements OnInit {

  inputCategory = {
    name: "Khoản chi khác",
    image: "khoanchikhac",
    idcategory: "5a85892332bdec050bea4894",
    groupcategory: "expense"
  };
  @Output() outputCategory: EventEmitter<any> = new EventEmitter<any>();

  // LẤY DỮ LIỆU CÁC GIAO DỊCH
  dataExpense: Array<any>;
  dataDebtLoan: Array<any>;
  dataIncome: Array<any>;

  constructor(private expense: Expense,
    private debt_loan: Debt_LoanSevice,
    private income: InCome,
    private modalService: NgbModal,) {

    // HIỆN THỊ DỮ LIỆU CHỌN CATEGORY
    this.getDataExpense();
    this.getDataDebt_Loan();
    this.getDataIncomes();
  }

  ngOnInit() {
  }

  // MỞ MODAL CHỌN CATEGORY
  openModalCategory(content) {
    this.modalService.open(content, { windowClass: 'modalCategory' });
  }

  // LẤY DATA CHI TIÊU TỪ CSDL
  getDataExpense() {
    this.expense.getDataExpense().then((result) => {
      this.dataExpense = result.data;
    });
  }

  // LẤY DATA NỢ TỪ CSDL
  getDataDebt_Loan() {
    this.debt_loan.getDataDebt_Loans()
      .then((result) => {
        this.dataDebtLoan = result.data
      });
  }
  // LẤY DATA INCOME TỪ CSDL
  getDataIncomes() {
    this.income.getDataIncomes().then((result) => {
      this.dataIncome = result.data;
    });
  }

  // LẤY CATEGORY ĐƯỢC CHỌN
  chooseCategory(event) {
    let eleChoose = event.target.parentNode;
    let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
    let detect = eleChoose.querySelectorAll('input[name=detect]')[0].value;
    let name = eleChoose.querySelectorAll('p')[0].textContent;
    let image = eleChoose.querySelectorAll('img')[0].src.split('/');
    image = image[image.length - 1].split('.')[0];

    this.inputCategory = {
      name: name,
      image: image,
      idcategory: id,
      groupcategory: detect
    }
    this.outputCategory.emit(this.inputCategory);
  }

}
