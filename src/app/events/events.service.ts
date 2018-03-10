import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { GlobalVariable, getHeaders } from '../app.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Events } from './events';

@Injectable()
export class EventService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;

    constructor(private http: Http) {
    }

    getEventsData(): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.get(`${this.baseApiUrl}/voterpulse/events/search`, { headers: headers })
            .map(res => {
                console.log('getLimit data' + JSON.stringify(res.json()));
                return res.json();
            }).catch(handleError);
    }

    saveEventData(data: Events) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            'eventDate': data.eventDate,
            'program': data.program,
            'areaName': data.areaName,
            'boothNo': data.boothNo,
            'managerName': data.managerName,
            'managerContact': data.managerContact
        });
        return this.http.post(`${this.baseApiUrl}/voterpulse/events/addnew`, body, options).toPromise()
            .then(res => res.json())
            .catch(handleError);
    }

    updateEventData(data: Events) {
        console.log('event in srvice'+ JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let body = JSON.stringify({
            'eventDate': data.eventDate,
            'program': data.program,
            'areaName': data.areaName,
            'boothNo': data.boothNo,
            'managerName': data.managerName,
            'managerContact': data.managerContact
        });
        console.log(body);
        return this.http.put(`${this.baseApiUrl}/voterpulse/events/` + data._id, body, options).toPromise()
            .then(res => res.json())
            .catch(handleError);
    }

    deleteEvent(data) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(`${this.baseApiUrl}/voterpulse/events/` + data, options).toPromise()
            .then(res => res.json())
            .catch(handleError);
    }
}

function handleError(error: Response) {
    console.log(error);
    // throw an application level error
    return Observable.throw(error.json() || 'Server error');
}

