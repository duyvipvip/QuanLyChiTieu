import { ISaving } from './../../../../model/saving.model';
import { SavingService } from './../../../../service/saving.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editsaving',
  templateUrl: './editsaving.component.html',
  styleUrls: ['./editsaving.component.scss']
})
export class EditsavingComponent implements OnInit {

  @Input() dataSaving: ISaving;
  idSaving: String;

  constructor(private savingService: SavingService, private route: ActivatedRoute) {
    this.idSaving = route.snapshot.paramMap.get('idsaving');
  }

  ngOnInit() {
  }

  updateSaving() {
    this.savingService.updateSaving(this.idSaving, this.dataSaving);
  }



}
