import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoadingPage } from './helpers/loading-indicator.component';


import { AppComponent } from './app.component';

import {PasswordModule} from 'primeng/password';
import {ButtonModule} from 'primeng/button';
import {DataTableModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';

import { HeaderComponent } from './header/header.component';
import { SearchInfoComponent } from './search-info/search-info.component';
import { ReportsComponent } from './reports/reports.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { OfficersComponent } from './officers/officers.component';
import { MediaComponent } from './media/media.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { PollingStationComponent } from './polling-station/polling-station.component';
import { ElectionComponent } from './election/election.component';
import { SendsmsComponent } from './sendsms/sendsms.component';
import { SendivrComponent } from './sendivr/sendivr.component';
import {NewMediaComponent} from './media/new-media/new-media.component';
import {NewOfficerComponent} from './officers/new-officer/new-officer.component';

@NgModule({
  declarations: [
    AppComponent,
    NewMediaComponent,
    NewOfficerComponent,
    HeaderComponent,
    SearchInfoComponent,
    ReportsComponent,
    SideNavComponent,
    OfficersComponent,
    MediaComponent,
    EventsComponent,
    LoadingPage,
    LoginComponent,
    FooterComponent,
    MainComponent,
    PollingStationComponent,
    ElectionComponent,
    SendsmsComponent,
    SendivrComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,   
    DataTableModule,
    PasswordModule,
    ButtonModule,
    GrowlModule,
    FormsModule, 
    HttpModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
