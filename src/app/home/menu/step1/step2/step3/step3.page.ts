import { Component, OnInit } from '@angular/core';
import{ AlertController} from'@ionic/angular';
 import { Geolocation } from '@capacitor/geolocation';
 import { IncidentService } from '../../../../../services/incident.service';
 import { Storage } from '@ionic/storage';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit {

  position = {
    long : 0,
    lat : 0
  };


  incident = {
    title  : '',
    gravite : 0,
    media : '',
    audio : '',
    type : 0,
    tel : 0,
    localisation: '',
    description : '',
    token : ''
  }

  description = '';
  errorMessage = '';

  constructor(public alertController:AlertController, private incidentService: IncidentService, private storage: Storage, private http: HttpClient, private router: Router) {
    this.obtenirPosition();
    this.storage.get('token').then((value) => {
       this.incident.token = value;
       console.log('le token en constructeur: ' + this.incident.token); // Afficher le type d'incident sélectionné
    });
  }


  ngOnInit() {
  }

  async openDialog() {
        const alert=await this.alertController.create(
          {header: 'OPERATION REUSSIE',
          subHeader: '',
          message: 'Votre incident a été signalé avec succès, vous pouvez contrôler son évolution dans votre historique des incidents',
          buttons: ['Ok']
        });
      await alert.present()
  }

  async openCancel() {
         const alert=await this.alertController.create(
           {header: 'OPERATION ANNULEE  ',
           subHeader: '',
           message: 'Votre opération a été annulée.',
           buttons: ['Ok']
         });
         await alert.present()
  }

  async openMissing() {
           const alert=await this.alertController.create(
             {header: 'Veuillez remplir tous les champs',
             subHeader: '',
             message: '',
             buttons: ['Ok']
           });
           await alert.present()
  }

  async openError() {
             const alert=await this.alertController.create(
               {header: "Une erreur s'est produite, veuillez réessayer",
               subHeader: '',
               message: '',
               buttons: ['Ok']
             });
             await alert.present()
  }


  async obtenirPosition() {
    const position = await Geolocation.getCurrentPosition();
    console.log('Position actuelle :', position);

    // Vous pouvez maintenant utiliser les données de position pour afficher sur votre vue.
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.position.long = longitude;
    this.position.lat = latitude;

    console.log(this.position);
    // Afficher les coordonnées en longitude et latitude.
  }

  soumissionFormulaire() {

      this.storage.get('newIncident').then((value) => {
               this.incident.type = value.type;
               this.incident.gravite = value.danger;
               this.incident.title = value.title;
               this.incident.tel = value.tel;
               this.incident.description = this.description;
               this.incident.localisation = '{long: ' + this.position.long + ', lat: ' + this.position.lat + '}'

               this.incidentService.setItem('newIncident', this.incident);

               console.log(this.incident);

               /*this.storage.get('headers').then((value) => {
                    const headers = value
                    console.log('le headers est: ' + headers); // Afficher le headers
                    console.log(this.incident);


                    this.http.post('http://localhost:8080/api/incidents/new/', this.incident, { headers })
                             .subscribe(response => {
                               // Enregistrement réussi, rediriger vers la page de menu
                               console.log('pendant appel y a quoi?');
                               this.openDialog();
                               this.router.navigate(['home/menu']);
                             }, error => {
                               // Gestion des erreurs
                               console.error("Erreur lors du signalement de l'incident: ", error);
                               console.log('pendant erreur appel y a quoi?');

                               if(error.error.error == "missing parameters" ){
                                this.openMissing();
                                this.errorMessage = "Champs pas tous remplis";
                               }else{
                                // Afficher un message d'erreur à l'utilisateur
                                this.errorMessage = "Une erreur s'est produite lors du signalement.";
                                this.openError();
                              }
                    });

               });*/

               this.http.post('http://localhost:8080/api/incidents/new/', this.incident)
                       .subscribe(response => {
                         // Enregistrement réussi, rediriger vers la page de menu
                         console.log('pendant appel y a quoi?');
                         this.openDialog();
                         this.router.navigate(['home/menu']);
                       }, error => {
                         // Gestion des erreurs
                         console.error("Erreur lors du signalement de l'incident: ", error.error);
                         console.log('pendant erreur appel y a quoi?');

                         if(error.error.error == "missing parameters" ){
                          this.openMissing();
                          this.errorMessage = "Champs pas tous remplis";
                         }else{
                          // Afficher un message d'erreur à l'utilisateur
                          this.errorMessage = "Une erreur s'est produite lors du signalement.";
                          this.openError();
                         }

               });

               console.log('apres appel y a quoi?')
      });




    }


}
