import { Component, OnInit } from '@angular/core';
import {ElectionService} from './election.service';
import {Election} from './election';
import { LoadingPage } from '../helpers/loading-indicator.component';
@Component({
  selector: 'app-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.css'],
  providers:[ElectionService],
  entryComponents:[LoadingPage]
})
export class ElectionComponent extends LoadingPage implements OnInit {
electionData :Election[];
  constructor(private electionService: ElectionService) {
    super();
   }

  ngOnInit() {
  this.standby();
    this.electionService.getelectionData().subscribe(data => {
      this.electionData= data;    
      this.ready();      
     });
  }

}
