import { Component, Input } from '@angular/core';

@Component({
    styleUrls: ['edit-wallet.component.scss'],
    templateUrl: 'edit-wallet.component.html',
    selector: 'app-edit-wallet'
})

export class EditWalletComponent{

    @Input() dataEditWallet: object;


    constructor(){
        
    }

    submitEdit(){
        console.log(this.dataEditWallet);
    }
}