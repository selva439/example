import { Component, OnInit } from '@angular/core';
import { PollingStationService } from './polling-station.service';
import { LoadingPage } from '../helpers/loading-indicator.component';

@Component({
  selector: 'app-polling-station',
  templateUrl: './polling-station.component.html',
  styleUrls: ['./polling-station.component.css'],
  providers:[PollingStationService],
  entryComponents: [LoadingPage]
})
export class PollingStationComponent extends LoadingPage  implements OnInit {
  pollingStationData:any;
  constructor(private pollingStationService:PollingStationService) {
    super();
   }

  ngOnInit() {
    this.standby();
    this.pollingStationService.getPollingStationData().subscribe(data=>{
      console.log(JSON.stringify(data));
      this.pollingStationData= data;    
      this.ready();
    })
  }

}