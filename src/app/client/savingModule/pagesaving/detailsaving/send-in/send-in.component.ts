import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute } from '@angular/router';
import { SavingService } from './../../../../../service/saving.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-send-in',
  templateUrl: './send-in.component.html',
  styleUrls: ['./send-in.component.scss']
})
export class SendInComponent implements OnInit {

  // ID SAVING
  idSaving: String;

   // DATA SAVING
   objSaving: any;

  objSendIn: any = {
    idwallet: '',
    money: '0',
    date: new Date().toISOString().slice(0, 10),
    note: '',
    namesaving: '',
    idsaving: ''
  };
  constructor(private modalService: NgbModal,
    private SavingService: SavingService,
    private ActivatedRoute: ActivatedRoute,
    vcr: ViewContainerRef,
    public toastr: ToastsManager,
  ) {
    this.toastr.setRootViewContainerRef(vcr);

    // LẤY ID WALLET TỪ URL
    ActivatedRoute.paramMap
      .subscribe((params) => {
        if (params['params'].idsaving != undefined) {
          this.idSaving = params['params'].idsaving
          this.objSendIn.idsaving = this.idSaving;
          this.SavingService.getOnlySaving(params['params'].idsaving)
            .then(() => {

              this.SavingService.get_onlySaving()
                .subscribe((result) => {
                  this.objSaving = result;
                  this.objSendIn.namesaving = result.namesaving;
                })
              
            })
        }
      })
  }

  ngOnInit() {
  }

  openModalSendin(content) {
    this.modalService.open(content, { windowClass: 'modalSendIn' })
  }

  // LẤY ID VÍ ĐƯỢC CHỌN
  selectIDToWallet(event) {
    this.objSendIn.idwallet = event;
  }

  // GỬI TIỀN VÀO KHOẢN TIẾT KIỆM
  submitSendIn() {
    this.objSendIn.money = this.objSendIn.money.toString().replace(/,/g, '');
    
    this.SavingService.addSavingSendIn(this.objSendIn)
      .then((result) => {
        this.reloadData();
         this.toastr.success("Gửi vào khoản tiết kiệm thành công", "Succsess");
      })
      .catch((err) => {
        this.toastr.warning("Gửi vào khoản tiết kiệm thất bại"+err, "Warning");
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
