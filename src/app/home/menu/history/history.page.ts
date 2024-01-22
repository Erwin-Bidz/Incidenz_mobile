import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../../services/api.service';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  history : any
  types : any
  user: any;
  token = '';


  constructor(public  http: HttpClient, private apiService: ApiService, private storage: Storage) {
    this.getUserInfo();
  }

  ngOnInit() {
  }

  /*readAPI(URL: string){
      this.storage.get('token').then((value) => {
               this.token = value;
               console.log('le token en constructeur: ' + this.token); // Afficher le type d'incident sélectionné
               const headers = new HttpHeaders({
                  'content-type': 'application/x-www-form-urlencoded',
                  //'authorization': 'Bearer ${this.token}'
                  'authorization': 'Bearer '+ this.token
               });

      });

      return this.http.get(URL, headers);
  }*/

  readAPI(URL: string): Observable<any> {
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

          this.storage.set('headers', headers);

          return this.http.get(URL, { headers }).pipe(
            catchError(error => {
              console.error("Une erreur s'est produite : ", error);
              // Gérer l'erreur selon vos besoins
              return throwError(error);
            })
          );
        })
      );
    }



   getUserInfo() {
      this.apiService.getUserInfo().subscribe((data: any) => {
        this.user = data; // Stockez les informations de l'utilisateur dans une variable pour les afficher dans le template HTML
        console.log(this.user);

        if(this.user.id != 1){
          this.readAPI('http://localhost:8080/api/incidents/byUser/').subscribe((data) =>{
              this.history = data; console.log(data);
              for (let i = 0; i < this.history.length; i++){
                  //console.log('yes');
                  this.history[i].createdAt = this.history[i].createdAt.replace(/[TZ]/g, "  ");
              }
           });
          this.readAPI('http://localhost:8080/api/typeIncidents/').subscribe((data2) =>{ this.types = data2; console.log(data2);});
        }else{
          this.history = [{
            description: "Pour voir les incidents que vous avez signalés, vous devez tout d'abord vous identifier. Cependant, vous ne verez que les incidents que vous aurez signalés étant authentifié.",
            title: "Pour voir les incidents que vous avez signalés, vous devez tout d'abord vous identifier. Cependant, vous ne verez que les incidents que vous aurez signalés étant authentifié."
          }]
        }
      });
   }

}
