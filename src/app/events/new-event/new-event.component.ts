import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Events} from '../events';
import { EventService } from '../events.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.css']
})
export class NewEventComponent implements OnInit {
  @Input() tableData: any;
  @Input() event: Events;
  @Output() outputEvent = new EventEmitter();
  public eventForm: FormGroup;

  constructor(private eventService: EventService) { }
  ngOnInit() {    
    this.eventForm = new FormGroup({
      eventDate: new FormControl(),
      program: new FormControl(),
      areaName: new FormControl(),
      boothNo: new FormControl(),
      managerName: new FormControl(),
      managerContact: new FormControl()
    });
  }

  saveEvent(req: Events) {
    console.log('add data' + JSON.stringify(req));
    console.log(req._id);
    if (req._id == undefined || req._id == "") {
      // this.overlayManager.open("window-loading", null);
      this.eventService.saveEventData(req).then((data) => {
        console.log(JSON.stringify(data));
        this.outputEvent.emit(this.tableData);
        this.newEventObjectonClose();
        // this.overlayManager.close("window-loading");
      });
    } else {
      // this.overlayManager.open("window-loading", null);
      this.eventService.updateEventData(req).then((data) => {
        console.log(JSON.stringify(data));
        this.newEventObjectonClose();
        this.outputEvent.emit(this.tableData);
        // this.overlayManager.close("window-loading");  
      });
    }
  }

  reset() {
    this.event = new Events;
  }
  newEventObjectonClose() {
    return this.event = new Events;
}

}
