import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private storage: Storage) {
    this.initDatabase();
  }

  async initDatabase() {
          await this.storage.create();
          // La base de données a été créée, vous pouvez maintenant y accéder
  }

}
