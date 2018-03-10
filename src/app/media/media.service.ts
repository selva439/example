import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable, getHeaders } from '../app.component';
// import { UserRestriction } from './voter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Media } from './media';


@Injectable()
export class MediaService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;

    constructor(private http: Http) {
    }

    getMediaData(): Observable<any> {

        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(`${this.baseApiUrl}/voterpulse/media/search`, { headers: headers })
            .map(res => {
                console.log('getLimit data' + JSON.stringify(res.json()));
                return res.json();
            }).catch(handleError);
    }

    saveMediaData(data: Media) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            'name': data.name,
            'mediatype': data.mediaCategory,
            'medianame': data.mediaName,
            'mobile': data.contactNumber,
            'email': data.emailId
        });
        return this.http.post(`${this.baseApiUrl}/voterpulse/media/addnew`, body, options).toPromise()
            .then(res => res.json())
            .catch(handleError);
    }

    updateMediaData(data: Media) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            'name': data.name,
            'mediatype': data.mediaCategory,
            'medianame': data.mediaName,
            'mobile': data.contactNumber,
            'email': data.emailId
        });
        return this.http.put(`${this.baseApiUrl}/voterpulse/media/` + data._id, body, options).toPromise()
            .then(res => res.json())
            .catch(handleError);
    }

    deleteMedia(data) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(`${this.baseApiUrl}/voterpulse/media/` + data, options).toPromise()
            .then(res => res.json())
            .catch(handleError);
    }


}


function handleError(error: Response) {
    console.log(error);
    // throw an application level error
    return Observable.throw(error.json() || 'Server error');
}





