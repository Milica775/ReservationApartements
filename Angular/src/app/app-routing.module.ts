import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { AddhotelComponent } from './addhotel/addhotel.component';
import { LogoutComponent } from './logout/logout.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


const routes: Routes = [


  {
    path: '', redirectTo: '/home/hotels',pathMatch: 'full'
  },
  {
  path: 'home/registration/login', redirectTo: '/home/login', pathMatch: 'full'  
  },
  {
    path: 'home/login/registration', redirectTo: '/home/registration', pathMatch: 'full'
  },

  {
    path: 'home', component: HomeComponent, children : [

      {
        path: '', redirectTo: 'hotels', pathMatch: 'full'
      },
      {
        path: 'hotels', component : HotelsComponent
      },
      {
        path: 'admin', component : AdminComponent
      },
      {
        path: 'booking', component : BookingComponent
      },
      {
        path: 'registration', component : RegistrationComponent
      },
      {
        path: 'login', component : LoginComponent
      },
      {
        path: 'logout', component : LogoutComponent
      }

    ]

  },
  {
    path: 'booking', component : BookingComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'booking/:hotel_id', component: BookingComponent
  },
  {
    path: 'deleteDialog', component: DeleteDialogComponent
  },
  {
    path: 'addHotel/:hotel_id', component: AddhotelComponent
  },
  {
    path: 'addHotel', component: AddhotelComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


