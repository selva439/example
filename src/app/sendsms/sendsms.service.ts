import { Injectable } from '@angular/core';
import { Http, Response, Headers,  RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable, getHeaders } from '../app.component';
import { UserRestriction, Search } from './voter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SendSMSService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;
   
    constructor(private http: Http) {
       
    }

    
getUserInfo():Observable<any> {
    console.log('ser');
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });        
    return this.http.post(`${this.baseApiUrl}/voterpulse/users/uac`,  options) .map(res=> {           
    res.json()
    console.log('service data'+ res.json());
    }
).catch(handleError);
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

     getLimitData(data:any):Observable<any> {
         console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseApiUrl}/voterpulse/limits?acId=`+data, { headers: headers })
        .map(res=>{
            console.log('getLimit data'+ JSON.stringify(res.json()));
            return res.json();
        }).catch(handleError);
}

getPollingStationData(data:any):Observable<any> {
         console.log(data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.get(`${this.baseApiUrl}/voterpulse/pollingstation/getbyLimitId?limitId=`+data, { headers: headers })
        .map(res=>{
            console.log('getPollingStation data'+ JSON.stringify(res.json()));
            return res.json();
        }).catch(handleError);
}
getBoothData(data:any):Observable<any> {
    console.log(data);
let headers = new Headers({ 'Content-Type': 'application/json' });
return this.http.get(`${this.baseApiUrl}/voterpulse/pollingstation/getbyareaid?areaName=`+data, { headers: headers })
   .map(res=>{
       console.log('getPollingStation data'+ JSON.stringify(res.json()));
       return res.json();
   }).catch(handleError);
}

searchData(data:Search):Observable<any> {
let headers = new Headers({ 'Content-Type': 'application/json' });
let query = `${this.baseApiUrl}/voterpulse/send?cid=`+data.cid +
'&limits=' +data.limits +'&psarea=' +data.psarea +'&psid='+ data.psid +'&category='+ data.category +'&type=' + data.type;
console.log(query);
return this.http.get(query, { headers: headers })
   .map(res=>{
       console.log('getting Mobile Numbers data'+ JSON.stringify(res.json()));
       return res.json();
   }).catch(handleError);
}

}

// function mapBatsProject(response: Response): UserRestriction {
//     return response.json().Data.map(res => <UserRestriction>({
//         showParliment: res.showParliment,        
//         showAssembly: res.showAssembly,
//         showLimit: res.showLimit,
//         showArea: res.showArea,
//         showBooth: res.showBooth,
//         assemblyData: res.AssemblyData        
//     }))
// }

function handleError(error: Response) {
    console.log(error);
    // throw an application level error
    return Observable.throw(error.json() || 'Server error');
}




  
