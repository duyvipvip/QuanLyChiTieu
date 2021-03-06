import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SavingService } from './../../../../../service/saving.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-out',
  templateUrl: './send-out.component.html',
  styleUrls: ['./send-out.component.scss']
})
export class SendOutComponent implements OnInit {

  // ID TIẾT KIỆM
  idSaving: String;

  // DATA SAVING
  objSaving: any;

  objSendOut: any = {
    idwallet: '',
    money: '0',
    date: new Date().toISOString().slice(0, 10),
    note: '',
    namesaving: '',
    idsaving: ''
  };

  modalSendin: NgbModalRef;

  constructor(private modalService: NgbModal,
    private ActivatedRoute: ActivatedRoute,
    private SavingService: SavingService,
    vcr: ViewContainerRef,
    public toastr: ToastsManager,
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    // LẤY ID WALLET TỪ URL
    ActivatedRoute.paramMap
      .subscribe((params) => {
        if (params['params'].idsaving != undefined) {
          this.idSaving = params['params'].idsaving
          this.objSendOut.idsaving = this.idSaving;
          this.SavingService.getOnlySaving(params['params'].idsaving)
            .then(() => {
              this.SavingService.get_onlySaving()
                .subscribe((result) => {
                  this.objSaving = result;
                  this.objSendOut.namesaving = result.namesaving;
                })
            })
        }
      })
  }

  ngOnInit() {
  }

  openModalSendOut(content) {
    this.modalSendin = this.modalService.open(content, { windowClass: 'modalSendIn' })
  }

  // LẤY ID VÍ ĐƯỢC CHỌN
  selectIDToWallet(event) {
    this.objSendOut.idwallet = event;
  }

  // GỬI TIỀN VÀO KHOẢN TIẾT KIỆM
  submitSendOut() {
    if (this.objSendOut.idwallet == '') {
      this.toastr.warning("Bạn trưa chọn ví", "Warning");
    } else if (this.objSendOut.money == '') {
      this.toastr.warning("Bạn trưa nhập số tiền", "Warning");
    } else if (this.objSendOut.money <= 0) {
      this.toastr.warning("Số tiền phải là số dương", "Warning");
    } else if (isNaN(this.objSendOut.money)) {
      this.toastr.warning("Số tiền phải là một số", "Warning");
    } else if (this.objSendOut.date == '') {
      this.toastr.warning("Bạn trưa chọn ngày", "Warning");
    } else if (this.objSendOut.money > this.objSaving.moneyTransaction) {
      this.toastr.warning("Số tiền đã nhập phải nhỏ hơn số tiền hiện tại đã lưu", "Warning");
    } else {
      this.SavingService.addSavingSendOut(this.objSendOut)
        .then((result) => {
          this.modalSendin.close();
          this.reloadData();
          this.toastr.success("Rút ra từ khoản tiết kiệm thành công", "Succsess");
        })
        .catch((err) => {
          this.toastr.warning("Rút ra từ khoản tiết kiệm thất bại", "Warning");
        })
    }


  }

  // RELOAD DATA
  reloadData() {
    // CẬP NHẬT LẠI 1 SAVING
    this.SavingService.getOnlySaving(this.idSaving);
    // CẬP NHẬT LẠI MẢNG SAVING
    this.SavingService.getSavings();
  }

}
