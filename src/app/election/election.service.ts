import { Injectable } from '@angular/core';
import { Http, Response, Headers,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable, getHeaders } from '../app.component';
import { Election } from './election';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ElectionService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;   
    constructor(private http: Http) {       
    }

     getelectionData():Observable<any> {         
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseApiUrl}/voterpulse/elections`, { headers: headers })
        .map(res=>{                       
            return res.json();
        }).catch(handleError);
}
}

function handleError(error: Response) {
    console.log(error);
    // throw an application level error
    return Observable.throw(error.json() || 'Server error');
}




  
