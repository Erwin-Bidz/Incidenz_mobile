import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user: any;
  id = 0;

  constructor(public  http: HttpClient, private apiService: ApiService, private storage: Storage) {
    this.getUserInfo();
   }

  ngOnInit() {
  }

  getUserInfo() {
          this.apiService.getUserInfo().subscribe((data: any) => {
            this.user = data; // Stockez les informations de l'utilisateur dans une variable pour les afficher dans le template HTML
            console.log(this.user);
            this.id = this.user.id;
          });
     }

}
