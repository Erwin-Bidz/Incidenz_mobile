import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertController} from'@ionic/angular';
import { IncidentService } from '../services/incident.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  password!: string;
  tel!: string;
  token = '';

  constructor(private storage: Storage, public alertController:AlertController, private incidentService: IncidentService, private http: HttpClient, private router: Router) {
    this.initDatabase();
  }


  async initDatabase() {
          await this.storage.create();
          // La base de données a été créée, vous pouvez maintenant y accéder
  }


  connexionInvite() {

      const body = {
        tel: 54458532,
        password: 'tiji1',
      };

        // Envoi de la requête POST à l'API
            this.http.post<any>('http://localhost:8080/api/users/login/', body, { observe: 'response' })
              .subscribe(
                (response: HttpResponse<any>) => {
                    console.log(response);
                    const token = response.headers.get('Authorization');
                    this.token = response.body.token;
                    console.log(this.token);
                    this.incidentService.setItem('token', this.token);
                    this.router.navigate(['home/menu', { token: this.token }]);
                    //this.router.navigate(['home/menu']);
                },
                (error) => {
                  this.openDialog();
                },
              );

  }

  async openDialog() {
            const alert=await this.alertController.create(
              {header: 'Erreur réseau',
              subHeader: '',
              message: 'Vérifiez votre connexion Internet, et réessayez',
              buttons: ['Ok']
            });
          await alert.present()
    }


}
