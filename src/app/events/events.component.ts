import { Component, OnInit } from '@angular/core';
import { EventService } from './events.service';
import { LoadingPage } from '../helpers/loading-indicator.component';
import {ConfirmationService} from 'primeng/api';
import {Events} from './events';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers:[EventService, ConfirmationService],
  entryComponents: [LoadingPage]
})
export class EventsComponent extends LoadingPage implements OnInit {
  eventData:any[];
  currentEvent = new Events;
  modalTitle:string= "";
  isShowNewEventModal: boolean = false;
  msgs: Message[] = [];
  constructor(private eventService: EventService,private confirmationService: ConfirmationService) { 
    super();
  }

  ngOnInit() {
    this.loadEventGridData();
  }

  confirmDeleteEvent(data) {   
    this.confirmationService.confirm({
        message: 'Are you sure to delete this record?',
        accept: () => {
          this.standby();
            this.eventService.deleteEvent(data._id).then(data => {
              console.log('delete res'+JSON.stringify(data));              
              this.eventService.getEventsData().subscribe(resData => {
                this.eventData= resData;    
            });  
              this.ready();              
             });
        }
    });
}

loadEventGridData()
{
  this.standby();
  this.eventService.getEventsData().subscribe(data=>{
    console.log(JSON.stringify(data));
    this.eventData=data;
    this.ready();
  })
}
createNewEvent() {
  this.modalTitle= "Create New Event";
  this.currentEvent = new Events();
  this.isShowNewEventModal = true;        
}
OnEditEvent(data:Events)
{
  this.modalTitle = "Edit Event"
  this.currentEvent = data;
  this.isShowNewEventModal = true;    
}
refresh(event): void {
  this.msgs = [];
  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Event data saved Successfully!' });
  this.isShowNewEventModal = false;
  this.loadEventGridData();
}

}
