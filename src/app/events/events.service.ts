import { Injectable } from '@angular/core';
import { Http, Response, Headers,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable, getHeaders } from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class EventService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;
   
    constructor(private http: Http) {
       
    }

     getEventsData():Observable<any> {
         
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseApiUrl}/voterpulse/events/search`, { headers: headers })
        .map(res=>{
            console.log('getLimit data'+ JSON.stringify(res.json()));
            return res.json();
        }).catch(handleError);
}

}


function handleError(error: Response) {
    console.log(error);
    // throw an application level error
    return Observable.throw(error.json() || 'Server error');
}

