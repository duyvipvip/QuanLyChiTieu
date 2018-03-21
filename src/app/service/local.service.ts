import { Injectable } from '@angular/core';

@Injectable()
export class LocalService {
    public URL:String = 'http://localhost:3000';
    constructor() { }
}