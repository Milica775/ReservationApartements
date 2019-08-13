import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HotelsComponent } from './hotels/hotels.component';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './booking/booking.component';
import { BookingService } from './service/booking.service';
import { AuthService } from './service/auth.service';
import { HotelService } from './service/hotel.service';
import { LogoutComponent } from './logout/logout.component';
import { AddhotelComponent } from './addhotel/addhotel.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    LoginComponent,
    HotelsComponent,
    AdminComponent,
    BookingComponent,
    LogoutComponent,
    AddhotelComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, BookingService, HotelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
