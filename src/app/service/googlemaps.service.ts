import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GooleMapsService {

    constructor(private Http:Http) { }

    getPlaceNear(lat, lng){
        return this.Http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&rankby=distance&type=establishment&key=AIzaSyAS97GzU6KUqi2V2XEB6jsarQOk3NCV1JE')
        .toPromise()
        .then(location => {
            return location.json();
        })
    }
}