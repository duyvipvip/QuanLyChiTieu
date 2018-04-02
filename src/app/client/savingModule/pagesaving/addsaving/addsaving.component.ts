import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ISaving } from './../../../../model/saving.model';
import { SavingService } from './../../../../service/saving.service';
import { WalletService } from './../../../../service/wallet.service';
import { IWallet } from './../../../../model/wallet.model';
import { Component, OnInit, ViewContainerRef } from '@angular/core';


@Component({
  selector: 'app-addsaving',
  templateUrl: './addsaving.component.html',
  styleUrls: ['./addsaving.component.scss']
})
export class AddsavingComponent {
  dataWallets: IWallet[];
  objSaving: ISaving = {
    namesaving: '',
    image: 'thuong',
    idwallet: '',
    moneyend: 0,
    enddate: new Date().toISOString().slice(0, 10),
  };

  public modalAddSaving: NgbModalRef;

  constructor(private WalletService: WalletService,
    private SavingService: SavingService,
    private modalService: NgbModal,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    // HÀM LẤY DATA TẤT CÁ CẢ VÍ
    this.getDataWallets();

  }

  addDataSaving() {
    this.SavingService.addSaving(this.objSaving);

  }

  openAddSaving(content) {
    this.modalAddSaving = this.modalService.open(content, { windowClass: 'modalAddSaving' })
  }

  // THÊM KHOẢN TIẾT KIỆM
  submitSaving() {
    console.log(this.objSaving);
    if (this.objSaving.namesaving == '') {
      this.toastr.warning("Xin mời bạn nhập vào tên khoản tiết kiêm", "Warning");
    }else if (this.objSaving.moneyend.toString() == '') {
      this.toastr.warning("Xin mời bạn nhập vào số tiền", "Warning");
    }else if (this.objSaving.moneyend <= 0) {
      this.toastr.warning("Xin mời bạn nhập vào số tiền dương", "Warning");
    }else if (isNaN(Number.parseInt(this.objSaving.moneyend.toString()))) {
      this.toastr.warning("Số tiền phải là một số", "Warning");
    }else if (this.objSaving.image == '') {
      this.toastr.warning("Xin mời bạn chọn hình ảnh", "Warning");
    }else if (this.objSaving.idwallet == '') {
      this.toastr.warning("Xin mời bạn chọn ví", "Warning");
    }else{
      this.SavingService.addSaving(this.objSaving)
        .then((result) => {
          this.modalAddSaving.close();
          this.reloadData();
          this.toastr.success("Thêm khoản tiết kiệm thành công", "Success");
        })
        .catch((err) => {
          this.toastr.error("Thêm khoản tiết kiệm thất bại", "Error");
        })
    }
  }
  // HÀM LẤY DATA TẤT CÁ CẢ VÍ

  getDataWallets() {
    this.WalletService.getDataWallets();
    this.WalletService.getAllWallet.subscribe((wallet) => {
      this.dataWallets = wallet;
    })
  }

  // LẤY VÍ MÀ USER CHỌN
  selectIDToWallet(event){
    this.objSaving.idwallet = event;
  }
  
  reloadData(){
    this.SavingService.getSavings();
  }
}