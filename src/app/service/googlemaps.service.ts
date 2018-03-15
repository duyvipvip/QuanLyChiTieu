import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GooleMapsService {

    constructor(private Http:Http) { }

    getPlaceNear(lat, lng){
        console.log('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&rankby=distance&key=AIzaSyBcVKbNwlOc-3ecroa0iwS-TXhGGarfNu0');
        return this.Http.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+lat+','+lng+'&rankby=distance&type=all&key=AIzaSyBcVKbNwlOc-3ecroa0iwS-TXhGGarfNu0')
        .toPromise()
        .then(location => {
            return location.json();
        })
    }
}