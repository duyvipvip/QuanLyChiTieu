import { WalletService } from './../../../../../service/wallet.service';
import { Component, Input, OnChanges , OnInit, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-choose-wallet-report',
    templateUrl: "./choose-wallet.html",
    styleUrls: ['choose-wallet.scss'],
})

export class ChooseWalletReportComponent implements OnChanges, OnInit{
    
    private _inputIdWallet: String;
    dataWallets: Array<any>;

    @Input() set inputIdWallet(idwallet){
        this._inputIdWallet = idwallet;
    }
    @Output() outputIdWallet: EventEmitter<String> = new EventEmitter<String>();
    constructor(private WalletService:WalletService){
        this.getDataWallets();
        this.inputIdWallet
    }

    ngOnChanges(){
       
    }

    ngOnInit(){
        //console.log(this.inputIdWallet);
    }

    // NGƯỜI DÙNG CHỌN VÍ MÀ HỌ MUỐN THAY ĐỔI
    chooseNameWallet(event){
        let eleChoose = event.target.parentNode;
        let id = eleChoose.querySelectorAll('input[name=id]')[0].value;
        // GỬI RA COMPONET UPDATE
        this.outputIdWallet.emit(id);
    }
    chooseWallet(_idWallet){
        if(_idWallet == this._inputIdWallet){
            return "fa fa-check";
        }
        return '';
    }

     // HÀM LẤY DATA TẤT CÁ CẢ VÍ
     getDataWallets() {
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((data) => {
            this.dataWallets = data;            
        })
    }
}