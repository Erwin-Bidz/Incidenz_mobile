import { Component, OnInit } from '@angular/core';
import{ AlertController} from'@ionic/angular';
 import { Geolocation } from '@capacitor/geolocation';

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

  constructor(public alertController:AlertController) {
    this.obtenirPosition();
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

  //const coordinates = await Geolocation.getCurrentPosition();
  //this.position = Geolocation.getCurrentPosition();
  //console.log('Latitude: ' + coordinates.coords.latitude);
  //console.log('Longitude: ' + coordinates.coords.longitude);

  async obtenirPosition() {
    const position = await Geolocation.getCurrentPosition();
    console.log('Position actuelle :', position);

    // Vous pouvez maintenant utiliser les données de position pour afficher sur votre vue.
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.position.long = longitude;
    this.position.lat = latitude;

    console.log(this.position);
    // Faites ce que vous voulez avec les coordonnées.
  }


}
