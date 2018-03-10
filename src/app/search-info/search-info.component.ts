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
  assemblyDataValue:string= "0";limitDataValue:string=""; 
  pollingStationArea:string=""; boothDataValue:string ="";
  voterName:string = "";type:number=1;
  assemblyDataList: AssemblyData[];
  limitDataList :LimitData[];
  pollingStationDataList:any[];
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
          rname: localStorage.getItem('rname'),
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
      }else if(rleader =="area")
      {
        this.boothDataList = data.Areadata;
      }
           
     });
  }

  changeAssembly()
  {
    console.log(this.assemblyDataValue);
    this.searchService.getLimitData(this.assemblyDataValue).subscribe(data => {  
      console.log('limit'+JSON.stringify(data));   
      this.limitDataList = data;     
      this.pollingStationDataList = [];
      this.boothDataList = [];   

      this.limitDataValue="";
      this.pollingStationArea="";
      this.boothDataValue="";
     });   
  }

  changeLimit()
  {    
    let reqString:string;
    console.log('xfv'+    this.limitDataValue);   
    if(this.limitDataValue == "Rural Mandal")
    reqString = "RuralMandal";
    else
    reqString = this.limitDataValue;
    this.searchService.getPollingStationData(reqString).subscribe(data => {  
      console.log('polling Station'+JSON.stringify(data));         
      this.pollingStationDataList = data;     
      this.boothDataList = [];
      this.pollingStationArea="";
      this.boothDataValue="";
     });
     
  }
  changePollingStation()
    {
      console.log('xfv'+    this.pollingStationArea);  
      this.searchService.getBoothData(this.pollingStationArea).subscribe(data => {  
        console.log('booth data'+JSON.stringify(data));   
        this.boothDataList = data;             
      this.boothDataValue="";
       }); 
    }
    
searchData()
{
  
  console.log(this.assemblyDataValue);
  let reqString:string;
    console.log('xfv'+    this.limitDataValue);   
    if(this.limitDataValue == "Rural Mandal")
    reqString = "Rural+Mandal";
    else
    reqString = this.limitDataValue;

  this.search.cid = this.assemblyDataValue;
this.search.limits= reqString;
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
      this.type=1;
      this.votersData= [];
    }
}
