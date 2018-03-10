import { Component, OnInit } from '@angular/core';
import { OfficersService } from './officers.service';
import { LoadingPage } from '../helpers/loading-indicator.component';
import { Officers } from './officers';
import {ConfirmationService} from 'primeng/api';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
  selector: 'app-officers',
  templateUrl: './officers.component.html',
  styleUrls: ['./officers.component.css'],
  providers:[OfficersService, ConfirmationService],
  entryComponents: [LoadingPage]
})
export class OfficersComponent extends LoadingPage implements OnInit {
  officersData:any[];
  currentOfficer = new Officers;
  modalTitle:string= "";
  msgs: Message[] = [];
  isShowNewOfficerModal: boolean = false;
  constructor(private officerService: OfficersService, private confirmationService: ConfirmationService) {
    super();
  }

  
  confirmDeleteOfficer(data) {   
    this.confirmationService.confirm({
        message: 'Are you sure to delete this record?',
        accept: () => {
          this.standby();
            this.officerService.deleteOfficer(data._id).then(data => {
              console.log('delete res'+JSON.stringify(data));              
              this.officerService.getOfficersData().subscribe(resData => {
                this.officersData= resData;    
            });  
              this.ready();              
             });
        }
    });
}

  ngOnInit() {
    this.loadOfficerGridData();
  }
  loadOfficerGridData()
  {
    this.standby();
    this.officerService.getOfficersData().subscribe(data => {
      console.log(JSON.stringify(data));
      this.officersData= data;    
      this.ready();
      console.log(this.officersData); 
     });
  }
  createNewOfficer() {
    this.modalTitle= "Create New Officer";
    this.currentOfficer = new Officers();
    this.isShowNewOfficerModal = true;        
}
  OnEditOfficer(data:Officers)
  {
    this.modalTitle = "Edit Officer"
    this.currentOfficer = data;
    this.isShowNewOfficerModal = true;    
  }

  refresh(event): void {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Officer data saved Successfully!' });
    this.isShowNewOfficerModal = false;
    this.loadOfficerGridData();
}
}
