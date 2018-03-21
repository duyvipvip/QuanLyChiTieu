import { GooleMapsService } from './../../../../service/googlemaps.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-choose-location',
  templateUrl: './choose-location.component.html',
  styleUrls: ['./choose-location.component.scss']
})
export class ChooseLocationComponent implements OnInit {

  // OBJCET ĐỊA ĐIỂM
  @Input() objLocation: any;

  // DANH SACH TẤT CẢ CÁC ĐỊA ĐIỂM
  allPlace: Array<any>;

  // KHỞI TẠO CÁC BIẾN VỊ TRÍ
  lat: number = 10.812035;
  lng: number = 106.7119887
  zoom: number = 14;

  // TRUYỀN DỮ LIỆU RA COMPONNET CHA ID WALLET
  @Output() selectLocation: EventEmitter<Object> = new EventEmitter<Object>();

  constructor(private modalService: NgbModal,
    private GooleMapsService: GooleMapsService
  ) {
    // lấy dữ liệu google trả về
    this.GooleMapsService.getPlaceNear(this.lat, this.lng).then((data) => {
      this.allPlace = data.results;
    })

     // lấy toạ độ vị trí hiện tại
     this.setCurrentPosition();

  }

  ngOnInit() {
  }

  // MỞ MODAL CHỌN ĐỊA ĐIỂM GOOGLE MAP
  openModalGoogleMaps(content) {
    this.modalService.open(content);

  }

  // LẤY TOẠ ĐỘ HIỆN TẠI
  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 14;
      });
    }
  }

  // SUBMIT ĐỊA ĐIỂM
  submitLocation(place) {
    this.objLocation = {
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      name: place.name,
      xoa: false
    }
    this.selectLocation.emit(this.objLocation);
  }

  // XOÁ ĐI VỊ CHÍ ĐÃ CHỌN
  deleteLocation() {
    let tempDelete ={
      xoa: true,
    };
    this.objLocation.name = "Đặt vị trí";
    this.selectLocation.emit(tempDelete);
  }

}
