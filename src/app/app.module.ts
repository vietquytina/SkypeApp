import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DataService } from './services/data.service';
import { RouteService } from './services/route.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AuthDeactive } from './services/auth.deactive';
import { MessageBoxComponent } from './services/message/message.component';
import { FriendListComponent } from './components/dashboard/friendlist/friendlist.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PageNotFoundComponent } from './components/pageNotFound/pageNotFound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MessageBoxComponent,
    FriendListComponent,
    LoadingComponent,
    PageNotFoundComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  entryComponents: [MessageBoxComponent, LoadingComponent],
  providers: [DataService, RouteService, AuthService, AuthGuard, AuthDeactive, BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }