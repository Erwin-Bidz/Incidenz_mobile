import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  user : any;
  username = '';

  constructor(public  http: HttpClient, private apiService: ApiService) {
    this.getUserInfo();
  }

  ngOnInit() {
  }

  getUserInfo() {
        this.apiService.getUserInfo().subscribe((data: any) => {
          this.user = data; // Stockez les informations de l'utilisateur dans une variable pour les afficher dans le template HTML
          console.log(this.user);
          this.username = this.user.nom;
          console.log(this.username);
        });
        //console.log('infos user: '+this.apiService.getUserInfo());
  }

}
