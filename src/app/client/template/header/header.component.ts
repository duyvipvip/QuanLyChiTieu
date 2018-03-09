import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent{
    constructor(private Router:Router){
        
    }
    logout(){
        localStorage.removeItem('currentUser');
        this.Router.navigateByUrl('/dangnhap');
    }
}