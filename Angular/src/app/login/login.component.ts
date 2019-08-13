import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { Router /*, ActivatedRoute*/ } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User = new User();

  constructor(private authService: AuthService, private router:Router/*, private route: ActivatedRoute*/) { }

  ngOnInit() {
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  }

  login(form : NgForm){
    this.authService.login(this.user).subscribe(
       /*
      data=>{
        localStorage.setItem('token',data['token']);
        localStorage.setItem('userId',data['userId']); //nesto ne radi
      },
      */
      
        

      success=>{ 
      
      /*
        res=>{
        localStorage.setItem('token',res.token);
        localStorage.setItem('userId',res.userId); //nesto ne radi
        }
        */
        
        this.router.navigate(['home/hotels']); 
        
        
      },
      err =>{
        if(err.status == 200){  
          this.resetForm(form);
       
        }else{
          console.log(err.errors);
          
        }

      }
      


    );
  }

}
