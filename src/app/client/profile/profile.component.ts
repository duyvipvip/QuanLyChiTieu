import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../template/header/header.component';
import { UserService } from '../../service/user.service';
import { MenuComponent } from '../template/menu/menu.component';

@Component({
    moduleId: module.id,
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    private user = JSON.parse(localStorage.getItem('currentUser'));
    private info = {
        tensinhvien: "Huy",
        masinhvien: "124",
        lop: "D14PM02",
        khoa: "CNTT",
        nganh: "Ky thuat phan mem"
    };
    private url = this.user.hinhanh;
    private fileToUpload: File = null;
    constructor(private _user: UserService) {
        //HeaderComponent.updateUserStatus.next();
    }

    ngOnInit() {
    }

    doiAvatar() {
        this._user.updateAvatar(this.fileToUpload, this.user.token).then((data)=>{
            MenuComponent.updateUserStatus.next();
            alert("Thay ảnh thành công")
        }).catch((err)=>{
            alert(err);
        });
    }

    onSelectFile(event) { // called each time file input changes
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            this.fileToUpload = event.target.files[0];
            reader.readAsDataURL(event.target.files[0]); // read file as data url
            reader.onload = (event: any) => { // called once readAsDataURL is completed
                this.url = event.target.result;
            }
        }
    }

}

