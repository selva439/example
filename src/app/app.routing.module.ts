
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { SearchInfoComponent } from './search-info/search-info.component';
import { ReportsComponent } from './reports/reports.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { OfficersComponent } from './officers/officers.component';
import { MediaComponent } from './media/media.component';
import { EventsComponent } from './events/events.component';
import { MainComponent } from './main/main.component';
import { PollingStationComponent } from './polling-station/polling-station.component';
import { ElectionComponent } from './election/election.component';
import { SendsmsComponent } from './sendsms/sendsms.component';
import { SendivrComponent } from './sendivr/sendivr.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },  
    {path:'main',component: MainComponent,
    children: [       
        { path: 'search', component: SearchInfoComponent },    
        { path: 'reports', component: ReportsComponent },
        { path: 'sendsms', component: SendsmsComponent },    
        { path: 'sendivr', component: SendivrComponent },
        { path: 'officers', component: OfficersComponent },
        { path: 'media', component: MediaComponent},
        { path: 'events', component: EventsComponent} ,
        { path: 'pollingStation', component: PollingStationComponent},
        { path: 'electionResult', component: ElectionComponent}  ]}        
];
@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppRoutingModule
{ }  