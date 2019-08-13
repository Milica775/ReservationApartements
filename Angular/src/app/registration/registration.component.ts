import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  successMessage: boolean;
  errorMessage: String;
  user:User = new User();
 
  constructor(private router: Router,private authService : AuthService) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }
 
   register(form : NgForm){
    this.authService.registerUser(this.user).subscribe(
       success => {
          this.router.navigate(['home/login']);
       },
       err => {

        if(err.status == 442){
            this.errorMessage = err.error;
            setTimeout(() => this.errorMessage = "", 4000);
        }
        if(err.status == 200){
                    
          this.successMessage = true;  
          setTimeout(() => this.successMessage = false, 4000);
          this.resetForm(form);
        }
       }
  
    );


  }



}
