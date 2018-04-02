import { ExcelService } from './../../../../service/excel.service';
import { Router } from '@angular/router';
import { Expense } from './../../../../service/expense.service';
import { TransactionService } from './../../../../service/transaction.service';
import { WalletService } from './../../../../service/wallet.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-report1',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent1 implements OnInit {

  idWallet: String;
  dataTransaction: any;
  tempincome: any;
  tempexpense: any;
  date = new Date();
  modelDate = {
    "start": new Date(this.date.getFullYear(), this.date.getMonth(), 1),
    "end": new Date(this.date.getFullYear(), this.date.getMonth()+1, 0),
  }
  i = 0;
  view: any[] = [600, 400];

  constructor(private WalletService: WalletService,
    private Router: Router,
    private excelService: ExcelService,
    private location: Location,
    private TransactionService: TransactionService) {
    
    this.excelService = excelService;
    // LẤY DANH SÁCH TẤT CẢ CÁC VÍ
    this.WalletService.getDataWallets().then((wallets) => {
      this.idWallet = wallets[0]._id;
      this.getTransaction();
    })

    
  }

  exportToExcel() {
    this.excelService.exportAsExcelFile(PERSONS, 'persons');
  }

  getTransaction() {
   
    // LẤY DANH SÁCH CÁC GIAO DỊCH
    this.TransactionService.getTransactions(this.idWallet, null, false, this.modelDate)
      .then((data) => {
        this.dataTransaction = data;
        this.fomatMap(data);
      })
  }

  ngOnInit() {
  }

  colorScheme = {
    domain: ['#A10A28', '#C7B42C', '#AAAAAA', "#bf00ff", "#00FF00", "#222", "#FFFF00", "#CCEEFF"]
  };

  // CHỌN NGÀY 
  choosedate(event){
    this.modelDate = event;
    this.getTransaction();
  }

  // LẤY ĐƯỢC VÍ USER CHỌN
  chooseWallet(event) {
    this.idWallet = event;
    this.getTransaction();
  }

  // CHON XEM CHI TIẾT
  chooseDetail(arrData) {
    localStorage.setItem('ArrItemReportDetail', JSON.stringify(arrData));
  }

  // CHỈNH SỬA ĐỂ HIỆN THỊ LÊN BẢN ĐỒ
  fomatMap(arrtransition) {
    this.i = 0
    
    let arrInCome = [];
    let arrExpense = [];
    let totalMoneyExpense = 0;
    let totalMoneyIncome = 0;
    arrtransition.forEach(transition => {
      if (transition.groupcategory == "income") {
        totalMoneyIncome += Number.parseInt(transition.moneytransaction);
        arrInCome.push(transition);
      } else if (transition.groupcategory == "expense") {
        totalMoneyExpense += Number.parseInt(transition.moneytransaction);
        arrExpense.push(transition);
      }
    });

    let dataExpense = this.groupTransaction(arrExpense);
    let dataIncome = this.groupTransaction(arrInCome);
    dataExpense.totalMoney = totalMoneyExpense * -1;
    dataIncome.totalMoney = totalMoneyIncome;

    let expense = this.tempexpense = dataExpense;
    let income = this.tempincome = dataIncome;
    if (this.i == 0) {
      Object.assign(this, { expense, income });
    }
    this.i = 1;
    
  }

  // GOM NHÓM CÁC GIAO DỊCH GIỐNG NHAU
  groupTransaction(data) {
    let arrTemp = [];
    data.forEach(transaction => {
      let check_same = false;
      arrTemp.forEach((item) => {
        if (item[0].idcategory == transaction.idcategory) {
          item.push(transaction);
          check_same = true;
        }
      })
      if (check_same == false) arrTemp.push(new Array(transaction));
    });
    return this.totalGroupTransaction(arrTemp);
  }

  // TÍNH NAME VÀ VALUE CỦA MẢNG ĐỂ HIỆN THỊ CHO NGƯỜI DÙNG
  totalGroupTransaction(data) {

    // KIỂM TRA KHI NÀO CẦN ADD VÀO MẢNG
    let checkIncome = true;
    data.forEach(arrayTransaction => {

      arrayTransaction['name'] = arrayTransaction[0].categorytransaction;
      let totalmoney = 0;
      arrayTransaction.forEach((transaction) => {

        totalmoney += Number.parseInt(transaction.moneytransaction);

      })
      arrayTransaction['value'] = totalmoney;
      if (totalmoney < 0) {

        checkIncome = false;
        arrayTransaction['value'] = totalmoney * -1;

      }

    });
    data.name = (checkIncome == true) ? "Thu nhập" : "Chi tiêu";
    return data
  }

}
export class Person {
  id: number;
  name: String;
  surname: String;
  age: number;
}
export const PERSONS = [
  {
      id: 1
  },
  {
      id: 2,
  },
  {
      id: 3,
  }
];