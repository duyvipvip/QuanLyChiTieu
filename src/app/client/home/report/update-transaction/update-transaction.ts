import { CheckValueSevice } from './../../../../service/check-value.sevice';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from './../../../../service/wallet.service';
import { ITransaction } from './../../../../model/transaction.model';
import { Component, Input , OnInit, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';
@Component({
    selector: 'app-update-transaction',
    styleUrls: ['./update-transaction.scss'],
    templateUrl: 'update-transaction.html',
})

export class UpdateTransactionComponent implements OnInit, OnChanges{

    public _transaction: ITransaction;
    inputIdWallet: String;
    nameWallet: String;

    constructor(private WalletService: WalletService,
        private route: ActivatedRoute,
        private CheckValueSevice: CheckValueSevice,
    ){

    }
    @Input()
    set transaction(transaction) {
        // KIỂM TRA ITEM BÊN TRONG OBJECT CÓ NULL HAY KHÔNG
        if(!this.CheckValueSevice.checkItemObjectNull(transaction)){
           this.getDataWalletId(transaction.idwallet);
        }
        this._transaction = transaction;
    }

    ngOnChanges(changes: SimpleChanges){
       
    }
    ngOnInit(){
        
    }

    // THỰC HIỆN UPDATE
    submitUpdate(){
        console.log(this._transaction);
        let objUpdateTransaction: ITransaction= {
            _id: '',
            groupcategory: '',
            notetransaction: '',
            datecreatetransaction: '',
            moneytransaction: '',
            imagecategory:'',
            categorytransaction: '',
            idwallet: '',
            taguser: [''],
        }
    }

    // HÀM LẤY DỮ LIỆU TỪ COMPONENT CON GỬI RA
    outputChooseCategory(event){
        // THAY DỔI DỮ LIỆU CATEGORY BAN ĐẦU
        this._transaction.imagecategory = event.image;
        this._transaction.groupcategory = event.detect;
        this._transaction.categorytransaction = event.name;
    }

    // THAY ĐỔI DỮ LIỆU NGÀY GIAO DỊCH BAN ĐẦU
    changeDate(event){
        this._transaction.datecreatetransaction = event.value;
    }

    // GỬI CHO COMPONENT CHOOSE-WALLET
    changeWallet(idwallet){
        this.inputIdWallet = idwallet;
    }

    // NHẬN DỮ LIỆU TỪ COMPONENT CHOOSE-WALLET
    outputIdWallet(event){
        this._transaction.idwallet = event;
        this.getDataWalletId(event);
    }
    getDataWalletId(idwallet){
        this.WalletService.getDataWalletId(idwallet)
            .then((data) => {
               this.nameWallet = data.namewallet;
            });
    }
}