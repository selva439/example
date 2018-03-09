import { Injectable } from '@angular/core';
import { Http, Response, Headers,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable, getHeaders } from '../app.component';
import { User } from './user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;
   
    constructor(private http: Http) {
       
    }

    
getLogin(data : User):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });     
    let body = JSON.stringify({        
        'mobile': data.UserName,
        'password':data.Password        
});   
console.log('body'+body);
return this.http.post(`${this.baseApiUrl}/voterpulse/users/login`,body,  options) 
.map(storeLocal)
.catch(handleError);

    // return this.http.post(`${this.baseApiUrl}/voterpulse/users/login`,body,  options) .map(res=> {               
    // console.log('service data'+ JSON.stringify(res.json()));
    //  return res.json();
    // }).catch(handleError);
}


getRoleAccess(data : any):Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });     
    let body = JSON.stringify(data);   
console.log('body'+body);
    return this.http.post(`${this.baseApiUrl}/voterpulse/users/uac`,body,  options) .map(res=> {               
    console.log('service data'+ JSON.stringify(res.json()));
     return res.json();
    }).catch(handleError);
}

// getRoleAccess(data:any):Observable<any> {
//     let headers = new Headers({ 'Content-Type': 'application/json' });
//     return this.http.get(`${this.baseApiUrl}/voterpulse/users/uac`, { headers: headers })
//         .map(res=>{
//             console.log('getRoleAccess data'+ JSON.stringify(res.json()));
//         }).catch(handleError);
// }

}


function storeLocal(response: Response) {        
    localStorage.setItem('rleader', response.json().data.role.leader)
    localStorage.setItem('rid', response.json().data.role.id)
    localStorage.setItem('id', response.json().data.id)
    localStorage.setItem('name', response.json().data.name)
    localStorage.setItem('phone',response.json().data.phone ) 
    // localStorage.setItem('password', response.json().data) 
    return response.json().data;
}

     


function handleError(error: Response) {
    console.log(error);
    // throw an application level error
    return Observable.throw(error.json() || 'Server error');
}




  
