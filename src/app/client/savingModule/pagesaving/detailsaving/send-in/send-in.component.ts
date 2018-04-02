import { WalletService } from './../../../../../service/wallet.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute } from '@angular/router';
import { SavingService } from './../../../../../service/saving.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-send-in',
  templateUrl: './send-in.component.html',
  styleUrls: ['./send-in.component.scss']
})
export class SendInComponent implements OnInit {

  // ID SAVING
  idSaving: String;

  // DATA SAVING
  objSaving: any;

  objSendIn: any = {
    idwallet: '',
    money: '0',
    date: new Date().toISOString().slice(0, 10),
    note: '',
    namesaving: '',
    idsaving: ''
  };

  modalSendin: NgbModalRef;
  dataWallets: Array<any>;

  constructor(private modalService: NgbModal,
    private SavingService: SavingService,
    private ActivatedRoute: ActivatedRoute,
    private WalletService: WalletService,
    vcr: ViewContainerRef,
    public toastr: ToastsManager,
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    // LẤY ID WALLET TỪ URL
    ActivatedRoute.paramMap
      .subscribe((params) => {
        if (params['params'].idsaving != undefined) {
          this.idSaving = params['params'].idsaving
          this.objSendIn.idsaving = this.idSaving;
          this.SavingService.getOnlySaving(params['params'].idsaving)
            .then(() => {

              this.SavingService.get_onlySaving()
                .subscribe((result) => {
                  this.objSaving = result;
                  this.objSendIn.namesaving = result.namesaving;
                })

            })
        }
      })
  }

  ngOnInit() {
    // lấy tất cả thông tin ví
    this.getDataWallets();
  }

  openModalSendin(content) {
    this.modalSendin = this.modalService.open(content, { windowClass: 'modalSendIn' })
  }

  // LẤY ID VÍ ĐƯỢC CHỌN
  selectIDToWallet(event) {
    this.objSendIn.idwallet = event;
  }

  // HÀM LẤY DATA TẤT CÁ CẢ VÍ
  getDataWallets() {
    this.WalletService.getDataWallets();
    this.WalletService.getAllWallet.subscribe((wallet) => {
      this.dataWallets = wallet;
    })
  }

  // GỬI TIỀN VÀO KHOẢN TIẾT KIỆM
  submitSendIn() {
    if (this.objSendIn.idwallet == '') {
      this.toastr.warning("Bạn trưa chọn ví", "Warning");
    } else if (this.objSendIn.money == '') {
      this.toastr.warning("Bạn trưa nhập số tiền", "Warning");
    } else if (this.objSendIn.money <= 0) {
      this.toastr.warning("Số tiền phải là số dương", "Warning");
    } else if (isNaN(this.objSendIn.money)) {
      this.toastr.warning("Số tiền phải là một số", "Warning");
    } else if (this.objSendIn.date == '') {
      this.toastr.warning("Bạn trưa chọn ngày", "Warning");
    } else {
      let checkMoney = true;
      this.dataWallets.forEach((wallet) => {
        if (wallet._id == this.objSendIn.idwallet) {
          if ((Number.parseInt(this.objSendIn.money.toString())) > wallet.money) {
            checkMoney = false;
          }
        }
      })
      if(checkMoney == true){
        this.SavingService.addSavingSendIn(this.objSendIn)
        .then((result) => {
          this.modalSendin.close();
          this.reloadData();
          this.toastr.success("Gửi vào khoản tiết kiệm thành công", "Succsess");
        })
        .catch((err) => {
          this.toastr.warning("Gửi vào khoản tiết kiệm thất bại" + err, "Warning");
        })
      }else{
        this.toastr.warning("Số tiền trong ví bạn chọn hiện không dủ", "Warning");
      }

      
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
