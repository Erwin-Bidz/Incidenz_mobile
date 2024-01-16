import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getUserInfo() {
      return this.http.get(this.apiUrl + 'users/login/me/');
      //return this.http.get(this.apiUrl + 'users/login/user/');
  }

}
