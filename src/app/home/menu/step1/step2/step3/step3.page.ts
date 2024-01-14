import { Component, OnInit } from '@angular/core';
import{ AlertController} from'@ionic/angular';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.page.html',
  styleUrls: ['./step3.page.scss'],
})
export class Step3Page implements OnInit {

  constructor(public alertController:AlertController) { }

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


}
