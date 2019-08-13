import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotelService } from '../service/hotel.service';
import { Hotel } from '../model/hotel.model';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {



  constructor(private router: Router, private hotelService: HotelService) { }

  ngOnInit() {

    this.getHotels();

  }

  reservation(hotel){
    this.router.navigate(["/booking", hotel._id]);

  }

  getHotels(){
    this.hotelService.getAll().subscribe((res) => {
        this.hotelService.hotels = res as Hotel[];
    }

    );
  }

}
