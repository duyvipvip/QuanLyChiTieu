import { SavingService } from './../../../../../service/saving.service';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ISaving } from '../../../../../model/saving.model';

@Component({
  selector: 'app-edit-saving',
  templateUrl: './edit-saving.component.html',
  styleUrls: ['./edit-saving.component.scss']
})
export class EditSavingComponent implements OnInit {
  
  objSaving: ISaving;
  idSaving: String;
  
  constructor(private modalService: NgbModal,
    
    private ActivatedRoute: ActivatedRoute,
    private SavingService: SavingService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef, 
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    // LẤY ID NGÂN SÁCH
    ActivatedRoute.paramMap
    .subscribe((params) => {
        if(params['params'].idsaving != undefined){
          this.idSaving = params['params'].idsaving;
          this.getOnlySaving();
        }
    })
  }

  ngOnInit() {
  }

  // MỞ MODAL CHỈNH SỬA KHOẢN TIẾT KIỆM
  openEditSaving(content) {
    this.modalService.open(content, { windowClass: 'modalAddSaving' })
  }

  // LẤY 1 KHOẢN TIẾT KIỆM
  getOnlySaving(){
    this.SavingService.getOnlySaving(this.idSaving)
      .then((data) => {
        
        this.objSaving = data;
        this.objSaving.enddate = new Date(this.objSaving.enddate.toString()).toISOString().slice(0, 10);
      })
  }

  // USER CHỌN VÍ
  selectIDToWallet(event){
    //this.objSaving.idwallet = event;
  }

  // THỰC HIỆN CHỈNH SỬA
  submitSaving(){
    this.SavingService.editSaving(this.objSaving)
      .then((data) => {
        this.reloadData();
        this.toastr.success("Cập nhật khoản tiết kiệm thành công", "Success");
      })
      .catch((err) => {
        this.toastr.warning("Cập nhật khoản tiết kiệm thất bại" +err, "Warning");
      })
  }

  // RELOAD DATA
  reloadData(){
    // CẬP NHẬT LẠI 1 SAVING
    this.SavingService.getOnlySaving(this.idSaving);
    // CẬP NHẬT LẠI MẢNG SAVING
    this.SavingService.getSavings();
  }
}
