import { IWallet } from './../../../../model/wallet.model';
import { Component, Input } from '@angular/core';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import { Wallet } from '../../../../service/wallet.service';
import { Router } from '@angular/router';

@Component({
    styleUrls: ['edit-wallet.component.scss'],
    templateUrl: 'edit-wallet.component.html',
    selector: 'app-edit-wallet'
})

export class EditWalletComponent{

    @Input() dataEditWallet: IWallet;
    dataUpdateWallet: IWallet;

    constructor(private Wallet:Wallet, protected notif:NotificationsService, private router : Router){}

    // GỦI DỮ LIỆU CHỈNH SỬA
    submitEditWallet(name, money, id){
        this.dataUpdateWallet = {
            _id: id.value,
            money : money.value,
            namewallet: name.value
        }
        this.Wallet.updateDataWallet(this.dataUpdateWallet)
        .then((result) => {
            this.router.navigateByUrl('duy');
            this.router.navigateByUrl('/');
            this.notif.success('Success','Chỉnh sửa ví thành công',{
                timeOut: 3000,
            }
          );
        });
        
    }
   // GỦI ID XOÁ
   submitRemoveWallet(id){
        this.Wallet.deleteDataWallet(id.value)
        .then((result) => console.log(result));
   }
}