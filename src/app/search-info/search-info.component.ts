import { Component, OnInit } from '@angular/core';
import {SearchService} from './search-info.service';
import { UserRestriction, AssemblyData, LimitData, PollingStationData, Search, Voter } from './voter';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.css'],
  providers:[SearchService]
})
export class SearchInfoComponent implements OnInit {
  assemblyDataValue:string= "";limitDataValue:string=""; pollingStationArea:string=""; boothDataValue:string ="";
  voterName:string = "";type:any=0;
  assemblyDataList: AssemblyData[];
  limitDataList :LimitData[];
  pollingStationDataList:PollingStationData[];
  boothDataList: any[];
  votersData:Voter[];
  search :Search = new Search;
  userRes : UserRestriction = new UserRestriction;
  constructor(private searchService : SearchService) { }

  ngOnInit() {    
    var data = 
    {
        name: localStorage.getItem('name'),
        id: localStorage.getItem('id'),
        phone: localStorage.getItem('phone'),
	    password: localStorage.getItem('password'),
        role: {
          leader: localStorage.getItem('rleader'),
          id: localStorage.getItem('rid')
        }
    };       
    this.searchService.getRoleAccess(data).subscribe(data => {
      this.userRes= data;
      console.log('userREs'+ JSON.stringify(this.userRes));
      let rleader = localStorage.getItem('rleader');
      if(rleader == "MP")
      {
        this.assemblyDataList = data.AssemblyData; 
      }else if(rleader == "MLA")
      {
        this.limitDataList = data.AssemblyData; 
      }else if(rleader == "limits")
      {
        this.pollingStationDataList  = data.Areadata; 
      }
           
     });
  }

  changeAssembly()
  {
    console.log(this.assemblyDataValue);
    this.searchService.getLimitData(this.assemblyDataValue).subscribe(data => {  
      console.log('limit'+JSON.stringify(data));   
      this.limitDataList = data;     
     });   
  }

  changeLimit()
  {
    console.log('xfv'+    this.limitDataValue);   
    this.searchService.getPollingStationData(this.limitDataValue).subscribe(data => {  
      console.log('polling Station'+JSON.stringify(data));   
      this.pollingStationDataList = data;     
     });
     
  }
  changePollingStation()
    {
      console.log('xfv'+    this.pollingStationArea);  
      this.searchService.getBoothData(this.pollingStationArea).subscribe(data => {  
        console.log('booth data'+JSON.stringify(data));   
        this.boothDataList = data;     
       }); 
    }
    
searchData()
{
  
  console.log(this.assemblyDataValue);
  this.search.cid = this.assemblyDataValue;
this.search.limits= this.limitDataValue;
this.search.psarea = this.pollingStationArea;
this.search.psid = this.boothDataValue;
this.search.vname = this.voterName;
this.search.type = this.type;
console.log('search data'+ this.search);
this.searchService.searchData(this.search).subscribe(data => {  
  console.log('votersData'+JSON.stringify(data));   
  this.votersData = data;     
 });  
}
    reset()
    {
      this.assemblyDataValue="";
      this.limitDataValue="";
      this.pollingStationArea="";
      this.boothDataValue="";
      this.voterName="";
      this.type=0;
      this.votersData= [];
    }
}
