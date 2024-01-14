import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  history : any
  types : any

  user: any;

  constructor(public  http: HttpClient, private apiService: ApiService) {
    this.readAPI('http://localhost:8080/api/incidents/').subscribe((data) =>{ this.history = data; console.log(data);});
    this.readAPI('http://localhost:8080/api/typeIncidents/').subscribe((data2) =>{ this.types = data2; console.log(data2);});
    this.getUserInfo();
  }

  ngOnInit() {
  }

  readAPI(URL: string){
      return this.http.get(URL);
  }

   getUserInfo() {
      this.apiService.getUserInfo().subscribe((data: any) => {
        this.user = data; // Stockez les informations de l'utilisateur dans une variable pour les afficher dans le template HTML
        console.log(this.user);
      });
   }

}
