import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, ViewContainerRef } from '@angular/core';


@Component({
    moduleId:module.id,
    selector: 'clientregister',
    styleUrls: ['./clientregister.component.scss'],
    templateUrl: './clientregister.component.html'
})
export class ClientRegisterComponent{
    model: any ={};

    constructor(private UserService: UserService,
        private Router:Router,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
    ){
        this.toastr.setRootViewContainerRef(vcr);
    }
    register(){
        this.UserService.createUser(this.model)
            .then((result)=>{
                if(result.statusCode == 400){
                    this.toastr.warning(result.message + ' ! ', 'Warning ! ');
                }else{
                    this.toastr.success(result.message + ' ! ', 'Success ! ');
                    this.Router.navigateByUrl('/dangnhap');
                }
            })
            .catch((err) => {
                this.toastr.warning(err.message + ' ! ', 'Warning ! ');
            })
    }
}