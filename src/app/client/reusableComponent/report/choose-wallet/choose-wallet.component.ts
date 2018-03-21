import { WalletService } from './../../../../service/wallet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-wallet',
  templateUrl: './choose-wallet.component.html',
  styleUrls: ['./choose-wallet.component.scss']
})
export class ChooseWalletComponent implements OnInit {
  // LẤY DANH SÁCH TẤT CẢ CÁC VÍ
  dataWallets: Array<any>;

  // DỮ LIỆU COMPONENT CHA CHUYỀN VÀO ID
  @Input() idWallet: String;

  // TRUYỀN DỮ LIỆU RA COMPONNET CHA ID WALLET
  @Output() selectIDWallet: EventEmitter<String> = new EventEmitter<String>();

  // TÊN VÍ
  nameWallet: String;

  constructor(private modalService: NgbModal,
    private WalletService: WalletService,
  ) {
    // LẤY TẤT CẢ CÁC VÍ
    this.getDataWallets();

    // LẤY TÊN VÍ
    this.getNameWallet();
  }

  ngOnInit() {
  }
  // MỞ MODAL CHỌN VÍ
  openModalWallet(content) {
    this.modalService.open(content, { windowClass: 'modalWallet' });
  }

  // HÀM LẤY DATA TẤT CÁ CẢ VÍ
  getDataWallets() {
    this.WalletService.getDataWallets();
    this.WalletService.getAllWallet.subscribe((data) => {
      this.dataWallets = data;
    })
  }

  // LẤY THÔNG TIN VÍ ĐƯỢC CHỌN
  chooseWallet(event) {
    let eleChoose = event.target.parentNode;
    let id = eleChoose.querySelectorAll('input[name=id]')[0].value;

    this.idWallet = id;
    this.getNameWallet();
    this.selectIDWallet.emit(id);
  }

  // HIỆN THỊ DẤU TÍCH
  iconTick(idWallet) {
    return (idWallet == this.idWallet) ? 'fa fa-check' : '';
  }

  // LẤY TÊN VÍ
  getNameWallet() {
    this.WalletService.getDataWallets();
    this.WalletService.getAllWallet.subscribe((wallets) => {
      wallets.forEach(wallet => {
        if (wallet._id == this.idWallet) {
          this.nameWallet = wallet.namewallet;
        }
      });
    })
  }

  
}
