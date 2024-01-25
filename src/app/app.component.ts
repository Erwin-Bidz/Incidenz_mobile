import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {


  constructor(private storage: Storage) {
    this.initDatabase();
    //this.storage.set('id', 1);
  }

  async initDatabase() {
            await this.storage.create();
            // La base de données a été créée, vous pouvez maintenant y accéder
  }

  async deconnexion(){
    await this.storage.remove('token');
  }

}
