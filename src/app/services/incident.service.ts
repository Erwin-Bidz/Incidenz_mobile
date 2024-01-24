import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  constructor(private storage: Storage) {
   //this.initDatabase();
  }

    async initDatabase() {
        await this.storage.create();
        // La base de données a été créée, vous pouvez maintenant y accéder
    }

    async setItem(key: string, value: any): Promise<void> {
        await this.storage.set(key, value);
    }

    async getItem(key: string): Promise<any> {
      return await this.storage.get(key);
    }

    async removeItem(key: string): Promise<void> {
      await this.storage.remove(key);
    }

}
