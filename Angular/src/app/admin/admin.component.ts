import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { HotelService } from '../service/hotel.service';
import { Hotel } from '../model/hotel.model';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  user:User;
  hotel:Hotel;
  constructor(private router: Router,private route: ActivatedRoute,private hotelService: HotelService,private authService:AuthService) { }

  ngOnInit() {
     this.getUsers();
     this.getHotels();

  }

   add(){
    this.router.navigate(["/addHotel"]);

  }

  deleteHotel(hotel){

    //this.router.navigate(["/addHotel", hotel._id]);
    //this.hotel.hotelId = this.route.snapshot.paramMap.get('hotel_id');
     this.hotelService.delete(hotel).subscribe(

      );
      
      
      
  }

   deleteUser(user){
      this.authService.delete(user).subscribe(

      );
   
  }

  

  getHotels(){
    this.hotelService.getAll().subscribe((res) => {
        this.hotelService.hotels = res as Hotel[];
    }
  );
}
 getUsers(){
    this.authService.getAll().subscribe((res) => {
        this.authService.users = res as User[];
    }
  );
} 
}
