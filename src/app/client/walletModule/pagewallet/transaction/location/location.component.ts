import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  constructor(private modalService: NgbModal,) { 
  }

  ngOnInit() {
    
  }
  open(content) {
    this.modalService.open(content);
  }
}
