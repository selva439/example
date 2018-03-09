import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {Officers} from '../officers';
import {OfficersService} from '../officers.service';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
@Component({
  selector: 'app-new-officer',
  templateUrl: './new-officer.component.html',
  styleUrls: ['./new-officer.component.css'],
providers:[OfficersService]
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
  //   this.officerForm = this.formBuilder.group({
  //     QualityProjectName: ['', [Validators.required, this.checkProjectQualityNameExists]]
  // });
  }

  saveOfficer(req: Officers)
  {
    // this.overlayManager.open("window-loading", null);
    this.officersService.saveOfficerData(req).then((data) => {
      if (data.Status) {
          // this.outputEvent.emit(TableData);
          this.newOfficerObjectonClose();
          // this.overlayManager.close("window-loading");
      }
  });
  }

  newOfficerObjectonClose() {
    // this.officerForm.clearValidators();
    return this.officer = null;
}
}
