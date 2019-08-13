import { Injectable } from '@angular/core';
import { Booking } from '../model/booking.model';
import { Hotel } from '../model/hotel.model';
import { User } from '../model/user.model';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router'; //


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
   booking:Booking = new Booking();
   user:User=new User();
  readonly baseURL = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  makeReservation(booking:Booking){
    var body=JSON.stringify(booking);
    var token=localStorage.getItem('token')
    ? '?token='+localStorage.getItem('token')
    : '';
    var headers=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseURL + '/addBooking' + token , body,{headers:headers})
    .pipe(
       map(response=>{     
         var booking = new Booking();

          response['creditCard'];
          response['roomType'];               
          response['checkInDate'];            
          response['checkOutDate'];
          response['user'];
          response['hotel'];   

         
               
            return booking;   
               
       })
    );

    
    
    

    

  }

}
