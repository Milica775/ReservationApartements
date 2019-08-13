import { Component, OnInit } from '@angular/core';
import { HotelService } from '../service/hotel.service';
import { Hotel } from '../model/hotel.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-addhotel',
  templateUrl: './addhotel.component.html',
  styleUrls: ['./addhotel.component.css']
})
export class AddhotelComponent implements OnInit {

   hotel:Hotel = new Hotel();
  successMessage: Boolean;

  constructor(private hotelService: HotelService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
  }

  submit(){
  // console.log("JES");
    this.hotelService.addHotels(this.hotel).subscribe(

      success => {
        this.router.navigate(['home/admin']);
      },
      err => {
        if(err.status == 200){

          this.successMessage = true;  
          setTimeout(() => this.successMessage = false, 3500);
          this.router.navigate(['home/admin']); 

        }else{
          this.router.navigate(['home/login']); 
        }

      }

    );
  }
  Delete(){

    this.hotel.hotelId = this.route.snapshot.paramMap.get('hotel_id');
     this.hotelService.delete(this.hotel).subscribe(

      );

  }

}
