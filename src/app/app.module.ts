import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularModule } from './shared/angular.module';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { UserCreateEditComponent } from './components/users/user-create-edit/user-create-edit.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';

// Directives
import { TextColorDirective } from './directives/text-color.directive';
import { ErrorColorDirective } from './directives/error-color.directive';
import { BackgroundColorDirective } from './directives/background-color.directive';

// Templates
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './components/templates/header/header.component';
import { NavComponent } from './components/templates/nav/nav.component';
import { FooterComponent } from './components/templates/footer/footer.component';

//Places
import { ListPlacesComponent } from './components/places/list-places/list-places.component';
import { PlaceCreateEditComponent } from './components/places/place-create-edit/place-create-edit.component';
import { PlaceDeleteComponent } from './components/places/place-delete/place-delete.component';
import { ReportDeleteComponent } from './components/reports/report-delete/report-delete.component';
import { ReportCreateEditComponent } from './components/reports/report-create-edit/report-create-edit.component';
import { ListReportsComponent } from './components/reports/list-reports/list-reports.component';
import { ListQrcodesComponent } from './components/qrcode/list-qrcodes/list-qrcodes.component';
import { QrcodeCreateEditComponent } from './components/qrcode/qrcode-create-edit/qrcode-create-edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Services
import { UserService } from 'src/app/services/user.service';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AppComponent,
    UserCreateEditComponent,
    UserDeleteComponent,
    TextColorDirective,
    ErrorColorDirective,
    BackgroundColorDirective,
    HomeComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ListUsersComponent,
    ListPlacesComponent,
    PlaceCreateEditComponent,
    PlaceDeleteComponent,
    ReportDeleteComponent,
    ReportCreateEditComponent,
    ListReportsComponent,
    ListQrcodesComponent,
    QrcodeCreateEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
