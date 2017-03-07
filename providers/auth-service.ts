import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name=name;
    this.email=email;
  }
}

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  currentUser: User;

  public login(credentials) {
    if (credentials.email == null || credentials.password == null) {
      return Observable.throw("Please insert credentials");
    }
    else {
      return Observable.create(observer => {
        //Check backend
        let access = (credentials.password === "pass" && credentials.email === "email");
        this.currentUser = new User('Chase','chaserydeen@gmail.com');
        observer.next(access);
        observer.complete();
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    }
    else {
      //Store credentials in backend here
        return Observable.create(observer => {
          observer.next(true);
          observer.complete();
        });
      }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

}
