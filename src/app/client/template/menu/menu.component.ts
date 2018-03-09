import { Component } from '@angular/core';

@Component({
    selector: "app-menu",
    styleUrls: ["./menu.component.css"],
    templateUrl: "./menu.component.html"
})

export class MenuComponent{
    user = {
        "username" : JSON.parse(localStorage.getItem('currentUser')).username,
        "hinhanh" : JSON.parse(localStorage.getItem('currentUser')).hinhanh,
    }
    constructor(){
        console.log(JSON.parse(localStorage.getItem('currentUser')).username);
    }
}