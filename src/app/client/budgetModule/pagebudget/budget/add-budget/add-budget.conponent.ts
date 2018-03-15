import { IBudget } from './../../../../../model/budget.model';
import { IWallet } from './../../../../../model/wallet.model';
import { CheckValueSevice } from './../../../../../service/check-value.sevice';
import { BudgetSevice } from './../../../../../service/budget.servive';
import { WalletService } from './../../../../../service/wallet.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, ViewContainerRef } from '@angular/core';

@Component({
    selector: "app-addBudget",
    templateUrl: "./add-budget.component.html",
    styleUrls: ["./add-budget.component.scss"]
})

export class AddBudgetComponent{

    dataWallets: IWallet[];

    constructor(private WalletService : WalletService,
        private BudgetSevice : BudgetSevice,
        private CheckValueSevice: CheckValueSevice,
        public toastr: ToastsManager,
        vcr: ViewContainerRef

    ){
        this.toastr.setRootViewContainerRef(vcr);
        
        // HÀM LẤY DATA TẤT CÁ CẢ VÍ
        this.getDataWallets();
    }

     // BUDGET DEFAULT
     budget : IBudget = {
        "idcategory": '',
        "namecategory": 'Chọn Danh Mục',
        "imagecategory": 'default',
        "idwallet": '',
        "targetmoney": '0',
        "datestart": new Date().toDateString(),
        "dateend": new Date().toDateString(),
    }

     // LẤY CATEGORY ĐƯỢC CHỌN TỪ COMPONENT CON
     chooseCategory(event){
        this.budget.idcategory = event._id;
        this.budget.imagecategory = event.image;
        this.budget.namecategory = event.name;
    }
   

    // THỰC HIỆN THÊM NGÂN SÁCH
    submitAddBudget(){
        console.log(this.budget);
        // if(!this.CheckValueSevice.checkItemObjectNull(this.budget)){
        //     let a = new Date(this.budget.datestart.toString());
        //     let b = new Date(this.budget.dateend.toString());
        //     let difference = this.dateDiffInDays(a, b)+1;
        //     if(difference < 0){
        //         this.toastr.warning('Ngày kết thúc không được nhỏ hơn ngày bắt đầu ! ', 'Cảnh báo ! ');
        //     }else{
        //         this.BudgetSevice.createBudget(this.budget)
        //             .then((data) => {
        //                 this.resetDataBudget();
        //                 this.reloadData();
        //                 this.toastr.success('Thêm ngân sách thành công thành công ! ', 'Thành công ! ');
        //             })
        //             .catch((err) => {
        //                 this.resetDataBudget();
        //                 this.toastr.error('Có lỗi xẩy ra. Vui lòng kiểm tra lại ! ', 'Error ! ');
        //             })
        //     }
        // }
        // else{
        //     this.toastr.warning('Vui lòng nhập đầy đủ các filed vào ! ', 'Cảnh báo ! ');
        // }
        
    }

    // =================== function ====================

    // HÀM LẤY DATA TẤT CÁ CẢ VÍ
    getDataWallets() {
        this.WalletService.getDataWallets();
        this.WalletService.getAllWallet.subscribe((wallet) => {
            this.dataWallets = wallet;
        })
        
    }

    // KHOẢNG CÁCH GIỮA 2 NGÀY
    dateDiffInDays(a, b) {
        let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
        return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    }

    // RESET DATA
    resetDataBudget(){
        this.budget = {
            "idcategory": '',
            "namecategory": 'Chọn Danh Mục',
            "imagecategory": 'default',
            "idwallet": '',
            "targetmoney": '',
            "datestart": new Date().toDateString(),
            "dateend": new Date().toDateString(),
        }
    }

    // RELOAD DATA
    reloadData(){
        // CHẠY LẠI THÔNG TIN CỦA 1 NGÂN SÁCH
        this.BudgetSevice.getDataBudgets();
    }
}