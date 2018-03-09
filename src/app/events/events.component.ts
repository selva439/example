import { Component, OnInit } from '@angular/core';
import { EventService } from './events.service';
import { LoadingPage } from '../helpers/loading-indicator.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers:[EventService],
  entryComponents: [LoadingPage]

})
export class EventsComponent extends LoadingPage implements OnInit {

  eventData:any;
  constructor(private eventService: EventService) { 
    super();
  }

  ngOnInit() {
    this.standby();
    this.eventService.getEventsData().subscribe(data=>{
      console.log(JSON.stringify(data));
      this.eventData=data;
      this.ready();
    })
  }

}
