import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Component , ViewContainerRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector:       "app-layout",
    styleUrls:      ["./layout.component.scss"],
    templateUrl:    "./layout.component.html"
})
export class LayOutComponent{
    checkURL = false;
    constructor(private route: ActivatedRoute,
        public toastr: ToastsManager,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);

    }
}
