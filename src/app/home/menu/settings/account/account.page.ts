import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  user: any;

  infos = {
    nom : '',
    prenom : '',
    id : 0,
    email: '',
    tel: ''

  }

  token = '';

  constructor(public  http: HttpClient, private apiService: ApiService, private storage: Storage) {
     this.getUserInfo();
  }

  ngOnInit() {
  }

   getUserInfo() {
        this.apiService.getUserInfo().subscribe((data: any) => {
          this.user = data; // Stockez les informations de l'utilisateur dans une variable pour les afficher dans le template HTML
          console.log(this.user);
          this.infos.id = this.user.id;
          this.infos.nom = this.user.nom;
          this.infos.tel = this.user.tel;
          this.infos.email = this.user.email;
        });
   }

}
