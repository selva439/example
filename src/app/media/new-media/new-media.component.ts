import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Media} from '../media';
import { MediaService } from '../media.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-media',
  templateUrl: './new-media.component.html',
  styleUrls: ['./new-media.component.css']
})
export class NewMediaComponent implements OnInit {
  @Input() tableData: any;
  @Input() media: Media;
  @Output() outputEvent = new EventEmitter();
  public mediaForm: FormGroup;
  
  constructor(private mediaService: MediaService) { }
  ngOnInit() {
    this.mediaForm = new FormGroup({
      name: new FormControl(),
      designation: new FormControl(),
      department: new FormControl(),
      contactNumber: new FormControl(),
      emailId: new FormControl()
    });
  }
 
  saveMedia(req: Media) {
    console.log('add data' + JSON.stringify(req));
    console.log(req._id);
    if (req._id == undefined || req._id == "") {
      // this.overlayManager.open("window-loading", null);
      this.mediaService.saveMediaData(req).then((data) => {
        console.log(JSON.stringify(data));
        this.outputEvent.emit(this.tableData);
        this.newOfficerObjectonClose();
        // this.overlayManager.close("window-loading");
      });
    } else {
      // this.overlayManager.open("window-loading", null);
      this.mediaService.updateMediaData(req).then((data) => {
        console.log(JSON.stringify(data));
        this.newOfficerObjectonClose();
        this.outputEvent.emit(this.tableData);
        // this.overlayManager.close("window-loading");  
      });
    }
  }
  reset()
  {
    this.media= new Media;
  }
  newOfficerObjectonClose() {
    return this.media = new Media;
}
}
