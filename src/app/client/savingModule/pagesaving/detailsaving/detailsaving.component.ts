import { SavingService } from './../../../../service/saving.service';
import { ISaving } from './../../../../model/saving.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-detailsaving',
  templateUrl: './detailsaving.component.html',
  styleUrls: ['./detailsaving.component.scss']
})
export class DetailsavingComponent implements OnInit {
  dataSaving: ISaving = {
    namesaving: '',
    idwallet: '',
    moneyend: 0,
    image: '',
    enddate: null
  };

  constructor(
    private SavingService: SavingService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,

  ) {
    // LẤY ID WALLET TỪ URL
    ActivatedRoute.paramMap
    .subscribe((params) => {
        if(params['params'].idsaving != undefined){
          this.SavingService.getOnlySaving(params['params'].idsaving)
            .then(() => {
              // SỬ DUNG SUBJECT
              this.SavingService.get_onlySaving()
              .subscribe((data) => {
                this.dataSaving = data;
              })
            })
        }
    })
  }

  ngOnInit() {
   
  }

  

  // LẤY DỮ LIỆU 1 KHOẢN TIẾT KIỆM
  getSaving() {
    
  }

 

  

  //xóa khoản tiết kiệm
}
