import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { ListUsersComponent } from './components/users/list-users/list-users.component';
import { ListPlacesComponent } from './components/places/list-places/list-places.component';
import { ListReportsComponent } from './components/reports/list-reports/list-reports.component';
import { PlaceCreateEditComponent } from './components/places/place-create-edit/place-create-edit.component';
import { UserCreateEditComponent } from './components/users/user-create-edit/user-create-edit.component';
import { ReportCreateEditComponent } from './components/reports/report-create-edit/report-create-edit.component';
import { ListQrcodesComponent } from './components/qrcode/list-qrcodes/list-qrcodes.component';
import { QrcodeCreateEditComponent } from './components/qrcode/qrcode-create-edit/qrcode-create-edit.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "users",
    component: ListUsersComponent
  },
  {
    path: "user/create",
    component: UserCreateEditComponent
  },
  {
    path: "places",
    component: ListPlacesComponent
  },
  {
    path: "places/create",
    component: PlaceCreateEditComponent
  },
  {
    path: "reports",
    component: ListReportsComponent
  },
  {
    path: "report/create",
    component: ReportCreateEditComponent
  },
  {
    path: "qrcodes",
    component: ListQrcodesComponent
  },
  {
    path: "qrcode/create",
    component: QrcodeCreateEditComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
