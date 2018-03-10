import { Injectable } from '@angular/core';
import { Http, Response, Headers,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable, getHeaders } from '../app.component';
// import { UserRestriction } from './voter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Officers } from './officers';
@Injectable()
export class OfficersService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;
   
    constructor(private http: Http) {
       
    }

     getOfficersData():Observable<any> {         
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseApiUrl}/voterpulse/officers/search`, { headers: headers })
        .map(res=>{
            console.log('off');
            console.log('getLimit data'+ res.json());
            return res.json();
        }).catch(handleError);
}
saveOfficerData(data:Officers)
{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
        'name': data.name,
        'designation': data.designation,
        'department': data.department,
        'contactNumber': data.contactNumber,
        'emailId':data.emailId
    });    
    return this.http.post(`${this.baseApiUrl}/voterpulse/officers/addnew`, body, options).toPromise()
        .then(res => res.json())
        .catch(handleError);
}


updateOfficerData(data: Officers)
{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify({
        'name': data.name,
        'designation': data.designation,
        'department': data.department,
        'contactNumber': data.contactNumber,
        'emailId':data.emailId
    });    
    return this.http.put(`${this.baseApiUrl}/voterpulse/officers/`+data._id, body, options).toPromise()
        .then(res => res.json())
        .catch(handleError);
   
}
deleteOfficer(data)
{
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.delete(`${this.baseApiUrl}/voterpulse/officers/`+data, options).toPromise()
        .then(res => res.json())
        .catch(handleError);
}
}

function handleError(error: Response) {
    console.log(error);
    // throw an application level error
    return Observable.throw(error.json() || 'Server error');
}




  
