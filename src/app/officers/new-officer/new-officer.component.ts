import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Officers } from '../officers';
import { OfficersService } from '../officers.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-new-officer',
  templateUrl: './new-officer.component.html',
  styleUrls: ['./new-officer.component.css'],
  providers: [OfficersService]
})
export class NewOfficerComponent implements OnInit {
  @Input() tableData: any;
  @Input() officer: Officers;
  @Output() outputEvent = new EventEmitter();
  public officerForm: FormGroup;
  constructor(private officersService: OfficersService) { }

  ngOnInit() {
    this.officerForm = new FormGroup({
      name: new FormControl(),
      designation: new FormControl(),
      department: new FormControl(),
      contactNumber: new FormControl(),
      emailId: new FormControl()
    });
  }

  saveOfficer(req: Officers) {
    console.log('add data' + JSON.stringify(req));
    console.log(req._id);
    if (req._id == undefined || req._id == "") {
      // this.overlayManager.open("window-loading", null);
      this.officersService.saveOfficerData(req).then((data) => {
        console.log(JSON.stringify(data));
        this.outputEvent.emit(this.tableData);
        this.newOfficerObjectonClose();
        // this.overlayManager.close("window-loading");
      });
    } else {
      // this.overlayManager.open("window-loading", null);
      this.officersService.updateOfficerData(req).then((data) => {
        console.log(JSON.stringify(data));
        this.newOfficerObjectonClose();
        this.outputEvent.emit(this.tableData);
        // this.overlayManager.close("window-loading");  
      });
    }
  }
  reset() {
    this.officer = new Officers;
  }
  newOfficerObjectonClose() {
    return this.officer = new Officers;
  }
}
