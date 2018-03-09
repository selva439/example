import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router: Router) { }
  
       ngOnInit() {
          this.router.events.subscribe((evt) => {
              if (!(evt instanceof NavigationEnd)) {
                  return;
              }
              window.scrollTo(0, 0)
          });
       }
      ngAfterViewInit(): void {
        window.scroll(0, 0);
      }
 

}

export function getHeaders() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');  
    return headers;
  }
  
  export const GlobalVariable = Object.freeze({  
      BASE_API_URL: 'http://localhost:4200/api' 
  });