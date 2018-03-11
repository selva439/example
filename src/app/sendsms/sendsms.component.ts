import { Component, OnInit } from '@angular/core';
import {SendSMSService} from './sendsms.service';
import { UserRestriction, AssemblyData, LimitData, PollingStationData, Search } from './voter';


@Component({
  selector: 'app-sendsms',
  templateUrl: './sendsms.component.html',
  styleUrls: ['./sendsms.component.css'],
  providers:[SendSMSService]
})
export class SendsmsComponent implements OnInit  {
  assemblyDataValue:string= "0";limitDataValue:string=""; 
  pollingStationArea:string=""; boothDataValue:string ="";
  voterName:string = "";type:number=1;
  assemblyDataList: AssemblyData[];
  limitDataList :LimitData[];
  pollingStationDataList:any[];
  boothDataList: any[];
  categoryList : string[];  categoryValue : string = "";
  categorySublist : string[]; subCategoryValue : string = "";
  mobileNumbers:number[];
  textMessage : string;
  search :Search = new Search;
  userRes : UserRestriction = new UserRestriction;
  constructor(private sendSmsService : SendSMSService) { }

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
     
    this.getCategories();
    this.sendSmsService.getRoleAccess(data).subscribe(data => {
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

  getCategories() : void
  {
    console.log('getting categories');
    this.categoryList = ["Caste","Party","Occupation","Gender","Leaders"];
  }

  changeCategories(categoryValue : string) : void
  {
    if(this.categoryValue == "Caste") {
        this.categorySublist = ["Brahmin","Yadava","Mangali","Vaddera","Reddy","Mala","Madiga","Kapu","Arya Vaishya","Uppara","Padmashali","Muslim","Chakali"];
      }
    if(this.categoryValue == "Gender"){
      this.categorySublist = ["Male","Female"];
    }
    if(this.categoryValue == "Occupation"){
      this.categorySublist = ["Student","Farmer","Worker","Employee","Paster","Housewife","Business","Anganwadi Teacher","Weaving","Autodriver","Home Guard","Military","Unemployed","Employee(ILTD)"];
    }
    if(this.categoryValue == "Party"){
      this.categorySublist = ["TDP","YSRCP","NEUTRAL","JANASENA"];
    }
    if(this.categoryValue == "Leaders"){
      this.categorySublist = ["A","B","C","E"];
    }

  }

  changeAssembly()
  {
    console.log(this.assemblyDataValue);
    this.sendSmsService.getLimitData(this.assemblyDataValue).subscribe(data => {  
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
    this.sendSmsService.getPollingStationData(reqString).subscribe(data => {  
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
      this.sendSmsService.getBoothData(this.pollingStationArea).subscribe(data => {  
        console.log('booth data'+JSON.stringify(data));   
        this.boothDataList = data;             
      this.boothDataValue="";
       }); 
    }
    
sendSMS()
{
  if(this.textMessage == undefined || this.textMessage.trim() == "" )
    alert("Enter a message");
  else {
    console.log('SendSMS');
    let reqString:string;
    console.log('xfv'+    this.limitDataValue);   
    if(this.limitDataValue == "Rural Mandal")
    //reqString = "Rural+Mandal";
    //else
    reqString = this.limitDataValue;

   this.search.cid = this.assemblyDataValue;
  this.search.limits= reqString;
  this.search.psarea = this.pollingStationArea;
  this.search.psid = this.boothDataValue;
  if(this.categoryValue == "Caste") {
        this.search.category = "c";
  }
    if(this.categoryValue == "Gender"){
     this.search.category = "g";
    }
    if(this.categoryValue == "Occupation"){
     this.search.category = "o";
    }
    if(this.categoryValue == "Party"){
    this.search.category = "p";
    }
    if(this.categoryValue == "Leaders"){
      this.search.category = "l";
     }

  
  this.search.type = this.subCategoryValue;

  this.mobileNumbers = [];
  this.sendSmsService.searchData(this.search).subscribe(data => {   
  data.forEach(element => {
    this.mobileNumbers.push(element['mobileNumber']);
  });
 });  

 }
}
}
