import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  rLeader:string;
  userName:string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.rLeader= localStorage.getItem('rleader');
    this.userName = localStorage.getItem('name');
  }
  print() {
window.print();
  }
  logout()
  {
    localStorage.removeItem('rleader');
    localStorage.removeItem('rid');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('phone');
    this.router.navigate(['login']);

  }
}
