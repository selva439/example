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
    console.log('login response'+data);
    // this.userData = data.data;
    // this.userData.role = new Role;
    // this.userData.role.leader = localStorage.getItem('leader');
    // this.userData.role.id = localStorage.getItem('id');
    // this.userData.name = localStorage.getItem('name');
    // this.userData.phone = localStorage.getItem('phone');   
    // console.log('userData from ls'+ JSON.stringify(this.userData));    

    this.router.navigate(['main/search']);

    // this.loginService.getRoleAccess(data).subscribe(data => {
    //   console.log('uac data'+ JSON.stringify(data));
      
    //  });

  });
  
  
 }
  
}
