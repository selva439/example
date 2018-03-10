import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { User,Role,UserData } from './user';
import { LoadingPage } from '../helpers/loading-indicator.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService],
  entryComponents: [LoadingPage]
})
export class LoginComponent extends LoadingPage implements OnInit {  
  public loginForm: FormGroup;
  user =new User;
  userData = new UserData;
 constructor(private loginService: LoginService,private router: Router) {
   super();
  }

 ngOnInit() {
   this.ready();
   this.loginForm = new FormGroup({
     UserName: new FormControl(),
     Password: new FormControl()   
  });   
 }

 loginUser(user: User) {  
  this.standby();  
  this.loginService.getLogin(user).subscribe(data => {          
    this.ready();
    console.log('login response'+ JSON.stringify(data));    
    this.router.navigate(['main/search']);
  });    
 }
  
}
