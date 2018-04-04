import { TransactionService } from './../../../../service/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-transaction',
  templateUrl: './search-transaction.component.html',
  styleUrls: ['./search-transaction.component.scss']
})
export class SearchTransactionComponent implements OnInit {

  // CHUỖI TÌM KIẾM
  searchStr = '';

  // MẢNG GIAO DỊCH
  transactions: Array<any>;

  // ID WALLET 
  idWalletUrl: String;
  constructor(private modalService: NgbModal,
    private ActivatedRoute: ActivatedRoute,
    private TransactionService: TransactionService) {
    this.getArrayTransaction();
  }

  ngOnInit() {
  }

  openSearchTransaction(content) {
    this.modalService.open(content, { windowClass: 'modalSearchTransaction' });
  }

  // TÌM KIẾM GIAO DỊCH
  searchTransaction() {
    if (this.searchStr != '') {
      if (this.idWalletUrl != '') {
        // LẤY DATA GÁN CHO OBJECT dataWalletChoose ĐỂ XUẤT THÔNG TIN NÊN
        this.TransactionService.getSearchTransactions(this.idWalletUrl, this.searchStr)
          .then(() => {
            this.TransactionService.getallSearchTransaction.subscribe((data) => {
              this.transactions = data;
              this.transactions['searchStr']= this.searchStr;
              
            })
            
          })

      }
    }else{
      this.transactions = [];
    }

  }

  getArrayTransaction() {
    // LẤY ID WALLET TỪ URL
    this.ActivatedRoute.paramMap
      .subscribe((params) => {
        this.idWalletUrl = (params['params'].idwallet == undefined) ? '' : params['params'].idwallet;



      })
  }

}
