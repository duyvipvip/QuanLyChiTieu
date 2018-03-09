import { ActivatedRoute } from '@angular/router';
import { SavingService } from './../../../service/saving.service';
import { Component, OnInit } from '@angular/core';
import { ISaving } from '../../../model/saving.model';

@Component({
  selector: 'app-detailsaving',
  templateUrl: './detailsaving.component.html',
  styleUrls: ['./detailsaving.component.scss']
})
export class DetailsavingComponent implements OnInit {
  dataSaving: ISaving = {
    namesaving: '',
    walletid: '',
    moneyend: 0,
    enddate: new Date,
    userid: ''
  };

  transaction = {
    walletid: '',
    money: 0,
    status: "Gửi vào khoản tiết kiệm ",
    isGetIn: true
  }
  idSaving: String;

  constructor(
    private savingService: SavingService,
    private route: ActivatedRoute
  ) {

    this.idSaving = route.snapshot.paramMap.get('idsaving');
  }

  ngOnInit() {
    this.getDataSavingById(this.idSaving);
  }

  getDataSavingById(id) {
    this.savingService.getSavingById(id);
    this.savingService.getSavingSb.subscribe((data) => {
      this.dataSaving = data;
    })
  }
  deleteSaving() {
    this.savingService.deleteSaving(this.idSaving);
  }

  getInTransaction() {
    console.log("data"+this.dataSaving.walletid.toString());
    this.transaction = {
      walletid: this.dataSaving.walletid.toString(),
      money: 0,
      status: "Gửi vào khoản tiết kiệm "+this.dataSaving.namesaving,
      isGetIn: true
    }
  }

  getOutTransaction() {
    this.transaction = {
      walletid: this.dataSaving.walletid.toString(),
      money: 0,
      status: "Rút ra từ khoản tiết kiệm "+this.dataSaving.namesaving,
      isGetIn: false
    }
  }
}
