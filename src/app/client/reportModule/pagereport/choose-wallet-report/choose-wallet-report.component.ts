import { ActivatedRoute } from '@angular/router';
import { WalletService } from './../../../../service/wallet.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-choose-wallet-report',
  templateUrl: './choose-wallet-report.component.html',
  styleUrls: ['./choose-wallet-report.component.scss']
})
export class ChooseWalletReportComponent implements OnInit {

  // LẤY DANH SÁCH TẤT CẢ CÁC VÍ
  dataWallets: Array<any>;

  // TRUYỀN DỮ LIỆU RA COMPONNET CHA ID WALLET
  @Output() selectIDToWallet: EventEmitter<String> = new EventEmitter<String>();
  @Input() idWallet: String;

  // TÊN VÍ
  nameWallet: String = "Chọn ví";

  constructor(private modalService: NgbModal,
    private WalletService: WalletService,
    private ActivatedRoute: ActivatedRoute, ) {
    // LẤY TẤT CẢ CÁC VÍ
    this.getDataWallets();

    // LẤY TÊN VÍ
    this.getNameWallet();

    this.getWalletToID(this.idWallet);
  }

  ngOnInit() {
  }

  getWalletToID(idwallet) {
    this.WalletService.getDataWallets().then(() => {
      this.WalletService.getAllWallet.subscribe((wallets) => {
        wallets.forEach(wallet => {
          if (wallet._id == idwallet) {
            this.nameWallet = wallet.namewallet;
          }
        });
      })
    });
    
  }

  // MỞ MODAL CHỌN VÍ
  openModalWallet(content) {
    this.modalService.open(content, { windowClass: 'modalWallet' });
  }

  // HÀM LẤY DATA TẤT CÁ CẢ VÍ
  getDataWallets() {
    this.WalletService.getDataWallets().then((e) => {
      this.WalletService.getAllWallet.subscribe((data) => {
        this.dataWallets = data;
      })
    });

  }

  // LẤY THÔNG TIN VÍ ĐƯỢC CHỌN
  chooseWallet(event) {
    let eleChoose = event.target.parentNode;
    let id = eleChoose.querySelectorAll('input[name=id]')[0].value;

    this.idWallet = id;
    this.getWalletToID(id);
    this.selectIDToWallet.emit(id);
  }

  // HIỆN THỊ DẤU TÍCH
  iconTick(idWallet) {
    return (idWallet == this.idWallet) ? 'fa fa-check' : '';
  }

  // LẤY TÊN VÍ
  getNameWallet() {
    this.WalletService.getDataWallets().then(()=> {
      this.WalletService.getAllWallet.subscribe((wallets) => {
        wallets.forEach(wallet => {
          if (wallet._id == this.idWallet) {
            this.nameWallet = wallet.namewallet;
          }
        });
      })
    });
    
  }

}
