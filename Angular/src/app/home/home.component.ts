import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  navLinks = [
    {path: "hotels", label: "Hotels"},
    {path: "admin", label: "Admin"},
    { path: "registration", label: "Register"}
  ]

  constructor() { }

  ngOnInit() {
  }

}
