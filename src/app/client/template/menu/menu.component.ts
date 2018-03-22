import { ITagModel } from './../../../model/tagmodel.model';
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: "app-menu",
    styleUrls: ["./menu.component.css"],
    templateUrl: "./menu.component.html"
})

export class MenuComponent{

<<<<<<< HEAD
    
    public user: any;
    public static updateUserStatus: Subject<any> = new Subject();

    constructor(){
        this.user =  {
            "username" : JSON.parse(localStorage.getItem('currentUser')).username,
            "hinhanh" : JSON.parse(localStorage.getItem('currentUser')).hinhanh,
        }
        // MenuComponent.updateUserStatus.subscribe(res => {
        //     this.user =  {
        //         "username" : JSON.parse(localStorage.getItem('currentUser')).username,
        //         "hinhanh" : JSON.parse(localStorage.getItem('currentUser')).hinhanh,
        //     }
        //     console.log(this.user)
        // })
=======

    userW: any;

    public static updateUserStatus: Subject<any> = new Subject();

    constructor(private Router:Router){
        MenuComponent.updateUserStatus.subscribe(res => {
            
        })
        this.userW =  {
            "username" : JSON.parse(localStorage.getItem('currentUser')).username,
            "hinhanh" : JSON.parse(localStorage.getItem('currentUser')).hinhanh,
            "email" : JSON.parse(localStorage.getItem('currentUser')).email,
        }
    }

    moveToProfile() {
        this.Router.navigateByUrl('/thongtin');
>>>>>>> 7f9172a6552d4558c08ba12e9e015276c89e6a6a
    }
}