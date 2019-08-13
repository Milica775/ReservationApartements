import { Injectable } from '@angular/core';
import { Hotel } from '../model/hotel.model';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router'; //

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  hotels:Hotel[];
  hotel:Hotel = new Hotel();

  readonly baseURL = 'http://localhost:3000/user';
  readonly baseURL1 = 'http://localhost:3000/admin';

  
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.baseURL + '/getHotels');
  }

   addHotels(hotel:Hotel){
    var body=JSON.stringify(hotel);
     var token=localStorage.getItem('token')
    ? '?token='+localStorage.getItem('token')
    : '';
    var headers=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseURL1 + '/addHotel' + token, body,{headers:headers})
    .pipe(
       map(response=>{     
         var hotel = new Hotel();
          
          response['hotelId'];
          response['name'];
          response['price'];               
          response['category'];            
          response['roomCount'];  

         
               
            return hotel;   
               
       })
    );

  }
  
  delete(hotel){
     var token=localStorage.getItem('token')
    ? '?token='+localStorage.getItem('token')
    : '';
    return this.http.delete(this.baseURL1 + '/deleteHotel' + token);
  }
  
  
}
