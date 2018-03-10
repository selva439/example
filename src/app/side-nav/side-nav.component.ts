import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
rLeader:string;
isClassDisable: boolean =false;
  constructor() { }

  ngOnInit() {
    this.rLeader= localStorage.getItem('rleader');
    if(this.rLeader=="limits" || this.rLeader=="area" || this.rLeader=="booth")
    {
      this.isClassDisable = true;
    }
}

}
