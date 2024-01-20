import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token = '';

  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient, private storage: Storage) { }

  /*getUserInfo() {

        this.storage.get('token').then((value) => {
                   this.token = value;
                   console.log('le token: ' + this.token); // Afficher le type d'incident sélectionné
                   console.log(this.token);
        });

        const headers = new HttpHeaders({
           'content-type': 'application/x-www-form-urlencoded',
           //'authorization': 'Bearer ${this.token}'
           'authorization': 'Bearer '+ this.token
        });


        console.log('au final on a: '+ headers);
        return this.http.get(this.apiUrl + 'users/login/me/', { headers });
        //return this.http.get(this.apiUrl + 'users/login/user/');
  }*/

  getUserInfo(): Observable<any> {
    return from(this.storage.get('token')).pipe(
      switchMap(token => {
        if (!token) {
          return throwError('Token not found.');
        }

        console.log('le token: ' + token.toString());
        //console.log(token);

        const headers = new HttpHeaders({
          'content-type': 'application/x-www-form-urlencoded',
          'authorization': 'Bearer ' + token.toString()
        });

        console.log('au final on a: ' + headers);

        return this.http.get(this.apiUrl + 'users/login/me/', { headers }).pipe(
          catchError(error => {
            console.error("Une erreur s'est produite : ", error);
            // Gérer l'erreur selon vos besoins
            return throwError(error);
          })
        );
      })
    );
  }


}
