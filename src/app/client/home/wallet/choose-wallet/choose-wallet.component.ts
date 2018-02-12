import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit , Output, EventEmitter } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';

@Component({
    selector: "app-choose-wallet",
    templateUrl: "./choose-wallet.component.html",
    styleUrls: ["./choose-wallet.component.scss"]
})
export class ChooseWalletComponent implements OnInit{
    selectedWalletId: string;
    idWalletUrl: string = '';

    @Input() dataWallets: Array<any>;

    constructor(private route:ActivatedRoute, private router: Router){

        // LẤY ID WALLET TỪ URL
        route.paramMap
        .subscribe((params) => {
            if(params['params'].idwallet != undefined){
                this.idWalletUrl = params['params'].idwallet;                
            }
        })
    }

    ngOnInit(){
    }

    chooseWallet(idWallet){
        if(idWallet == this.idWalletUrl){
            return "fa fa-check";
        }
        return '';
    }
}