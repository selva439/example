import { Component, OnInit } from '@angular/core';
import { MediaService } from './media.service';
import { LoadingPage } from '../helpers/loading-indicator.component';
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  providers:[MediaService],
  entryComponents: [LoadingPage]
})
export class MediaComponent extends LoadingPage implements OnInit {
 mediaData:any;
  constructor(private mediaService: MediaService) {
    super();
   }

  ngOnInit() {
    this.standby();
    this.mediaService.getMediaData().subscribe(data => {
      console.log(JSON.stringify(data));
      this.mediaData= data;    
      this.ready();
  });
}
OnEditMedia(data)
{

}
OnDeleteMedia(data)
{

}
}
