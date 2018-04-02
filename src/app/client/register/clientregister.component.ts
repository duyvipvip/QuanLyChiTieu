import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { of as observableOf } from 'rxjs/observable/of';


@Component({
    moduleId:module.id,
    selector: 'clientregister',
    styleUrls: ['./clientregister.component.scss'],
    templateUrl: './clientregister.component.html'
})
export class ClientRegisterComponent{
    
    formSignup: FormGroup;
    get check() {
        return this.formSignup.get('checkboxValue').value;
    } 

    constructor(private UserService: UserService,
        private Router:Router,
        public toastr: ToastsManager,
        vcr: ViewContainerRef,
        private frmbuilder: FormBuilder) {
        this.toastr.setRootViewContainerRef(vcr);
        this.formSignup = frmbuilder.group({
            username: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['',[Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)],validPassword],
            question: ['', [Validators.required]],
            checkboxValue: ['', [Validators.required]]
        });
        function validPassword(control: AbstractControl) {
            return observableOf(control.parent.get('password').value !== control.parent.get('confirmPassword').value).pipe(
                map(result => result ? { invalid: true } : null)
            );
        }
    }
    register(){
        var data = {
            username: this.formSignup.get('username').value,
            email: this.formSignup.get('email').value,
            password: this.formSignup.get('password').value,
            cauhoi: this.formSignup.get('question').value
        }
        this.UserService.createUser(data)
            .then((result)=>{
                if(result.status === 400){
                    this.toastr.warning(result.message + ' ! ', 'Warning ! ');
                } else {
                    this.toastr.success(' ! ', 'Success ! ');
                    setTimeout( () => {
                        this.Router.navigateByUrl('/dangnhap');
                    }, 5000);  //5s           
                }
            })
            .catch((err) => {
                this.toastr.warning(err.message + ' ! ', 'Warning ! ');
            })
    }
}