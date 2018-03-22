import { ITagModel } from './../../../model/tagmodel.model';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: "app-menu",
    styleUrls: ["./menu.component.css"],
    templateUrl: "./menu.component.html"
})

export class MenuComponent{

    public user ={
        "username": '',
        "hinhanh": ''
    };
    public static updateUserStatus: Subject<any> = new Subject();

    constructor(){
        this.user =  {
            "username" : JSON.parse(localStorage.getItem('currentUser')).username,
            "hinhanh" : JSON.parse(localStorage.getItem('currentUser')).hinhanh,
        }
        // MenuComponent.updateUserStatus.subscribe(res => {
            
        //     console.log(this.user)
        // })
    }
}