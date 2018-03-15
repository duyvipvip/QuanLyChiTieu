import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Component , ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:       "app-pagewallet",
    styleUrls:      ["./pagewallet.component.scss"],
    templateUrl:    "./pagewallet.component.html"
})
export class PageWalletComponent{
    checkURL = false;
    constructor(private route: ActivatedRoute,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
        
         // LẤY ID WALLET TỪ URL
         route.paramMap
         .subscribe((params) => {
             if(params['params'].idwallet != undefined){
                 this.checkURL = true;
             }
         })

    }
}