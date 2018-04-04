import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { WalletService } from './../../../../../service/wallet.service';
import { BudgetSevice } from './../../../../../service/budget.servive';
import { IBudget } from './../../../../../model/budget.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Component , ViewContainerRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IWallet } from '../../../../../model/wallet.model';
declare var $: any;
@Component({
    selector: "app-update-budget",
    templateUrl: "./updatebudget.componnet.html",
    styleUrls: ["./updatebudget.componnet.scss"]
})
export class UpdateBudgetComponent{
     // BUDGET DEFAULT
     budget : IBudget = {
        "idcategory": '',
        "namecategory": 'Chọn Danh Mục',
        "imagecategory": 'default',
        "idwallet": '',
        "targetmoney": '',
        "datestart": new Date().toDateString(),
        "dateend": new Date().toDateString(),
    }
    // DANH SÁCH TẤT CẢ CÁC VÍ
    dataWallets: IWallet[];

    // ID BUDGET
    idbudget: String;
    constructor(private ActivatedRoute: ActivatedRoute,
        public toastr: ToastsManager,
        private modalService: NgbModal,
        private WalletService: WalletService,
        private BudgetSevice: BudgetSevice,
        private Router:Router,
        vcr: ViewContainerRef
    ){
        this.toastr.setRootViewContainerRef(vcr);
        // LẤY ID NGÂN SÁCH
        ActivatedRoute.paramMap
        .subscribe((params) => {
            if(params['params'].idbudget != undefined){
                this.idbudget = params['params'].idbudget
                this.getBudget(this.idbudget);
            }
        })

        // LẤY DANH SÁCH TẤT CẢ CÁC VÍ
        this.getDataWallets();
    }

    // HÀM LẤY DỮ LIỆU TỪ COMPONENT CON GỬI RA
    chooseCategory(event){
        // THAY DỔI DỮ LIỆU CATEGORY BAN ĐẦU
        this.budget.imagecategory = event.image;
        this.budget.namecategory = event.name;
        this.budget.idcategory = event._id;
    }

    // THỰC HIỆN UPDATE 
    submitUpdateBudget(){
        this.BudgetSevice.updateBudget(this.budget)
            .then((data) => {
                $('#updatebudget').modal('hide');
                this.reloadData();
                this.toastr.success("Cập Ngân Sách Thành Công", "Success");
            })
            .catch((err) => {
                this.toastr.success("Cập Ngân Sách Thất Bại" + err, "Err");
            })
    }

    // MỞ MODAL XEM CÓ XOÁ KHÔNG
    openModalDelete(content){
        this.modalService.open(content, { windowClass: 'modalDelete' });
    }

    // THỰC HIỆN XOÁ
    submitTrashBudget(){
        this.BudgetSevice.deleteBudget(this.budget._id)
            .then((data) => {
                $("#updatebudget").modal('hide');
                this.Router.navigateByUrl('/budget');
                this.toastr.success('Xoá Ngân Sách Thành Công ! ', 'Thành công ! ');
            })
            .catch((err) => {
                this.toastr.error('Xoá Giao Dịch Thất Bại ! '+ err, 'Error ! ');
            })

    }

    // ===================== FUNCTION ==================

    // LẤY THÔNG TIN MỘT NGÂN SÁCH
    getBudget(idbudget){
        this.BudgetSevice.getDataBudget(idbudget)
            .then((result) => {
                // lấy dữ liệu từ subject
                this.BudgetSevice.get_onlyBudget().subscribe((budget) => {
                    this.budget.idcategory = budget.idcategory;
                    this.budget.idwallet = budget.idwallet;
                    this.budget.namecategory= budget.namecategory;
                    this.budget.imagecategory = budget.imagecategory;
                    this.budget.targetmoney = budget.targetmoney;
                    this.budget.datestart =  new Date(budget.datestart.toString()).toISOString().slice(0, 10);
                    this.budget.dateend= new Date(budget.dateend.toString()).toISOString().slice(0, 10);
                    this.budget._id = budget._id;
                })
            })
    }

    // HÀM LẤY DATA TẤT CÁ CẢ VÍ
    getDataWallets() {
        this.WalletService.getDataWallets().then(() => {
            this.WalletService.getAllWallet.subscribe((wallet) => {
                this.dataWallets = wallet;
            })
        });
        
    }

    // RELOAD DATA
    reloadData(){
        // CHẠY LẠI THÔNG TIN CỦA 1 NGÂN SÁCH
        this.BudgetSevice.getDataBudget(this.idbudget);
        // CẬP NHẬT LẠI TÊN VÍ
        this.WalletService.getDataWalletId(this.budget.idwallet);
    }
}
