import { ITagModel } from './../../../model/tagmodel.model';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: "app-menu",
    styleUrls: ["./menu.component.css"],
    templateUrl: "./menu.component.html"
})

export class MenuComponent{

    private user: any;
    public static updateUserStatus: Subject<any> = new Subject();

    constructor(){
        MenuComponent.updateUserStatus.subscribe(res => {
            this.user =  {
                "username" : JSON.parse(localStorage.getItem('currentUser')).username,
                "hinhanh" : JSON.parse(localStorage.getItem('currentUser')).hinhanh,
            }
            console.log(this.user)
        })
    }
}