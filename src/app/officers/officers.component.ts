import { Component, OnInit } from '@angular/core';
import { OfficersService } from './officers.service';
import { LoadingPage } from '../helpers/loading-indicator.component';
import { Officers } from './officers';
@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css'],
  providers:[OfficersService],
  entryComponents: [LoadingPage]
})
export class OfficersComponent extends LoadingPage implements OnInit {
  officersData:any[];
  currentOfficer = new Officers;
  isShowNewOfficerModal: boolean = false;
  constructor(private officerService: OfficersService) {
    super();
  }

  ngOnInit() {
    console.log('oninit');
    this.standby();
    this.officerService.getOfficersData().subscribe(data => {
      console.log(JSON.stringify(data));
      this.officersData= data;    
      this.ready();
      console.log(this.officersData); 
     });
  }
  createNew() {
    this.currentOfficer = new Officers();
    this.isShowNewOfficerModal = true;        
}
  OnEditOfficer(data:Officers)
  {
    this.currentOfficer = data;
    this.isShowNewOfficerModal = true;    
  }

  OnDeleteOfficer(data:Officers)
  {
    this.officerService.deleteOfficer(data.id).then(data => {
      console.log(JSON.stringify(data));      
    });
}
}
