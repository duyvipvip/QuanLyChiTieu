import { ITransaction } from './../../../../model/transaction.model';
import { WalletService } from './../../../../service/wallet.service';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { TransactionService } from '../../../../service/transaction.service';

@Component({
  selector: 'app-transfer-money',
  templateUrl: './transfer-money.component.html',
  styleUrls: ['./transfer-money.component.scss']
})
export class TransferMoneyComponent implements OnInit {

  // NGÀY CHUYỂN TIỀN
  dateTransfer: String = new Date().toISOString().slice(0, 10);;

  // SỐ TIỀN MUỐN CHUYỂN
  moneyUserTransfer: String;

  // SỐ TIỀN MUỐN CHUYỂN
  moneyCostUserTransfer: String;

  // CATEGORY USER MUỐN CHUYỂN
  categoryUserTransfer: String;

  // ID VÍ TỪ URL
  idWalletUrl: String;

  // TÊN VÍ
  nameWallet: String;

  // NGHI CHÚ
  note: String = '';

  // CATEGORY USER TRANSFER
  objCategory = {
    name: "Khoản chi khác",
    image: "khoanchikhac",
    idcategory: "5a85892332bdec050bea4894",
    groupcategory: "expense"
  };

  // ID VÍ USER MUỐN GỬI ĐẾN
  idWalletTo: String = "0";

  constructor(private modalService: NgbModal,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private WalletService: WalletService,
    private ActivatedRoute: ActivatedRoute,
    private TransactionService: TransactionService,
  ) {
    // LẤY ID WALLET TỪ URL
    ActivatedRoute.paramMap
      .subscribe((params) => {
        this.idWalletUrl = (params['params'].idwallet == undefined) ? '' : params['params'].idwallet;

        if (this.idWalletUrl != '') {
          // lấy tất cả các giao dịch
          this.WalletService.getDataWallets();
          this.WalletService.getAllWallet.subscribe((wallets) => {
            wallets.forEach(wallet => {
              if (wallet._id == this.idWalletUrl) {
                this.nameWallet = wallet.namewallet;
              }
            });
          })
        }

      })
  }

  ngOnInit() {
  }

  openModalTransfersMoney(content) {
    this.modalService.open(content, { windowClass: 'modalExtentdWallet' });
  }

  // COMPOENNET CON GỬI DỮ LIỆU VỀ
  chooseCategory(event) {
    this.objCategory = event;
  }

  // COMPONENT CON GỬI ID WALLET VÍ ĐƯỢC CHỌN
  selectIDToWallet(event) {
    this.idWalletTo = event;
  }

  // LƯU DỮ LIỆU 
  submitTransferMoney() {
    if (this.moneyUserTransfer == null || this.moneyUserTransfer == '' || this.moneyUserTransfer == undefined) {
      this.toastr.warning('Số tiền không được bỏ trống ! ', 'Warning ! ');
    } else if (this.idWalletTo == "0") {
      this.toastr.warning('Ví bạn muốn gửi đến không dược bỏ trống ! ', 'Warning ! ');
    } else {
      let objFrom: ITransaction = {
        categorytransaction: this.objCategory.name,
        imagecategory: this.objCategory.image,
        notetransaction: this.note,
        moneytransaction: (Number.parseInt(this.moneyUserTransfer.toString()) * -1).toString(),
        datecreatetransaction: this.dateTransfer,
        idwallet: this.idWalletUrl,
        groupcategory: this.objCategory.groupcategory,
        idcategory: this.objCategory.idcategory,
      }
      let objTo: ITransaction = {
        categorytransaction: "Được tặng",
        imagecategory: "duoctang",
        notetransaction: this.note,
        moneytransaction: this.moneyUserTransfer,
        datecreatetransaction: this.dateTransfer,
        idwallet: this.idWalletTo,
        groupcategory: "income",
        idcategory: "5a7d25bd2504042b8e6be388",
      }
      let objCost: ITransaction;
      if (this.moneyCostUserTransfer != null && this.moneyCostUserTransfer != '' && this.moneyCostUserTransfer != undefined) {
        objCost = {
          categorytransaction: "Khoản chi khác",
          imagecategory: "khoanchikhac",
          notetransaction: "Phí chuyển khoản",
          moneytransaction: (Number.parseInt(this.moneyCostUserTransfer.toString()) * -1).toString(),
          datecreatetransaction: this.dateTransfer,
          idwallet: this.idWalletUrl,
          groupcategory: "expense",
          idcategory: "5a85892332bdec050bea4894",
        }
      }
      //tạo một giao dịch
      this.TransactionService.createTransaction(objFrom)
        .then(() => {
          this.TransactionService.createTransaction(objTo)
            .then(() => {
              if (objCost != undefined) {
                this.TransactionService.createTransaction(objCost)
                  .then(() => {
                    this.reloadData();
                    this.toastr.success('Bạn đã chuyển tiền thành công ! ', 'Success ! ');
                  })
              }else{
                this.reloadData();
                this.toastr.success('Bạn đã chuyển tiền thành công ! ', 'Success ! ');
              }
            })
        })
    }
  }

  // LOAD LẠI DATA
  reloadData(){
    let urlIdWallet = (this.ActivatedRoute.snapshot.params.idwallet == undefined) ? '' : this.ActivatedRoute.snapshot.params.idwallet;
    // LOAD LẠI CẬP NHẬT BÁO CÁO
    this.TransactionService.getTransactions(urlIdWallet);
    // LOAD CẬP NHẬT LẠI TẤT CẢ CÁC VÍ
    this.WalletService.getDataWallets();      
}
}
