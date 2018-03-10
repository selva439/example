import { Component, OnInit } from '@angular/core';
import { MediaService } from './media.service';
import { LoadingPage } from '../helpers/loading-indicator.component';
import {ConfirmationService} from 'primeng/api';
import { Media } from './media';
import { Message } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  providers:[MediaService,ConfirmationService],
  entryComponents: [LoadingPage]
})
export class MediaComponent extends LoadingPage implements OnInit {
 mediaData:any[];
 currentMedia = new Media;
  modalTitle:string= "";
  msgs: Message[] = [];
  isShowNewMediaModal: boolean = false;
  constructor(private mediaService: MediaService, private confirmationService: ConfirmationService) {
    super();
   }

  ngOnInit() {
   this.loadMediaGridData();
}

loadMediaGridData()
{
  this.standby();
  this.mediaService.getMediaData().subscribe(data => {
    console.log(JSON.stringify(data));
    this.mediaData= data;    
    this.ready();
});
}
confirmDeleteMedia(data) {   
  this.confirmationService.confirm({
      message: 'Are you sure to delete this record?',
      accept: () => {
        this.standby();
          this.mediaService.deleteMedia(data._id).then(data => {
            console.log('delete res'+JSON.stringify(data));              
            this.mediaService.getMediaData().subscribe(resData => {
              this.mediaData= resData;    
          });  
            this.ready();              
           });
      }
  });
}

createNewMedia() {
  this.modalTitle= "Create New Media";
  this.currentMedia = new Media();
  this.isShowNewMediaModal = true;        
}
OnEditMedia(data:Media)
{
  this.modalTitle = "Edit Media"
  this.currentMedia = data;  
  this.isShowNewMediaModal = true;    
}
refresh(event): void {
  this.msgs = [];
  this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Media data saved Successfully!' });
  this.isShowNewMediaModal = false;
  this.loadMediaGridData();
}

}
