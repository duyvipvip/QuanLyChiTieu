import { WalletService } from './../../../../../service/wallet.service';
import { Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-choose-wallet-report',
    templateUrl: "./choose-wallet.html",
    styleUrls: ['choose-wallet.scss'],
})

export class ChooseWalletReportComponent{
    
    private _inputIdWallet: String;
    dataWallets: Array<any>;

    @Input() set inputIdWallet(idwallet){ this._inputIdWallet = idwallet; }
    @Output() outputIdWallet: EventEmitter<String> = new EventEmitter<String>();

    constructor(private WalletService:WalletService){
        // LẤY TẤT CẢ CÁC VÍ HIỆN THỊ LÊN
        this.getDataWallets();
    }

    // NGƯỜI DÙNG CHỌN VÍ MÀ HỌ MUỐN THAY ĐỔI
    chooseWallet(event){
        let idwallet = event.target.parentNode.querySelectorAll('input[name=id]')[0].value;
        // GỬI RA COMPONET UPDATE
        this.outputIdWallet.emit(idwallet);
    }

    // HIỆN THỊ ICON
    iconTick(_idWallet){ return (_idWallet == this._inputIdWallet) ? "fa fa-check" : '' }

     // HÀM LẤY DATA TẤT CÁ CẢ VÍ
     getDataWallets() {
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((data) => {
            this.dataWallets = data;            
        })
    }
}