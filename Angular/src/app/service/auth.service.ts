import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import {HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  users:User[];

  readonly baseURL = 'http://localhost:3000/user';
  readonly baseURL1='http://localhost:3000/admin';

  constructor(private http: HttpClient) { }

  registerUser(user:User){
    var body=JSON.stringify(user);
    var headers=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseURL + '/signup', body,{headers:headers})
    .pipe(
      map(response=>{

      })
    );
  }

  login(user:User){
    var body=JSON.stringify(user);
    var headers=new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(this.baseURL + '/login', body,{headers:headers})
    .pipe(
      map(response=>{
         localStorage.setItem('token',response['token']);
         localStorage.setItem('userId',response['userId']);
      })
    );
    
  }

 
  
   getAll(){
    return this.http.get(this.baseURL + '/getUsers');
  }
  
   logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
    
    delete(user:User){
     var token=localStorage.getItem('token')
    ? '?token='+localStorage.getItem('token')
    : '';
    return this.http.delete(this.baseURL1 + '/deleteUser' + token);
  }
  
  

}
/*import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders,HttpResponse } from "@angular/common/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { User } from "../model/user.model";
import { ErrorService } from "../service/error.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  readonly baseURL = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}


  registerUser(user:User){
    return this.http.post(this.baseURL + '/signup', user);
  }

  login(user:User){
    return this.http.post(this.baseURL + '/login', user);
  }
}
/*
@Injectable()
export class AuthService {
    constructor(private http: HttpClient ,private errorService: ErrorService) {}

    registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/user/signup', user, { headers: headers })
    .map(res=>res.json());
  }
  */
       /* const body = JSON.stringify(user);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signup', body, {headers: headers}).pipe(
          map((response: HttpResponse<any>) => response.json()),
            catchError((error: HttpResponse<any>) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }));
            */
            /*
    }

    login(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/users/login', user, { headers: headers })
     .map(res=>res.json());
  }
  */

        /*const body = JSON.stringify(user);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/login', body, {headers: headers}.pipe(
          map((response: HttpResponse<any>) => response.json()),
            catchError((error: HttpResponse<any>) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }));
          

    logout() {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
  }
  /*
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  readonly baseURL = 'http://localhost:3000/user';


  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  registerUser(user:User){
    return this.http.post(this.baseURL + '/signup', user);
  }
  

  login(email:String,password:String){
    return this.http.post<any>(this.baseURL + '/login', {email,password})
    .pipe(map(user => {
      // login successful if there's a jwt token in the response
      if (this.user && this.user.token)
      {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
      }

      return user;
  }));
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

}
*/