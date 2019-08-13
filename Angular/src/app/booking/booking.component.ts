import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../model/booking.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  booking:Booking = new Booking();
  successMessage: Boolean;

  constructor(private bookingService: BookingService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  submit(){
    this.booking.hotel_id = this.route.snapshot.paramMap.get('hotel_id');
    this.bookingService.makeReservation(this.booking).subscribe(

      success => {},
      err => {
        if(err.status == 200){

          this.successMessage = true;  
          setTimeout(() => this.successMessage = false, 3500);
          this.router.navigate(['home/hotels']); 

        }else{
          this.router.navigate(['home/login']); 
        }

      }

    );

  }

}
