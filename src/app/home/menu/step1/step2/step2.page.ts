import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../../../services/incident.service';
import { ApiService } from '../../../../services/api.service';
import { Storage } from '@ionic/storage';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import '@ionic/pwa-elements';


@Component({
  selector: 'app-step2',
  templateUrl: './step2.page.html',
  styleUrls: ['./step2.page.scss'],
})
export class Step2Page implements OnInit {

  public previewPhoto: string | null = null;
  public photoUri: string = '';
  public photo: string = '';

  typeIncident = '';
  user : any;
  idType = 0;

  incident = {
    title  : '',
    gravite : 0,
    media : '',
    audio : '',
    type : 0,
    tel : 0
  }

  dangerosite : number = 1;

  constructor(private incidentService: IncidentService, private storage: Storage, private apiService: ApiService) {
    this.storage.get('incidentType').then((value) => {
         this.typeIncident = value;
         console.log('le type est: ' + this.typeIncident); // Afficher le type d'incident sélectionné
    });

    this.getUserId()
  }

  ngOnInit() {
  }


  getUserId() {
          this.apiService.getUserInfo().subscribe((data: any) => {
            this.user = data; // Stockez les informations de l'utilisateur dans une variable pour les afficher dans le template HTML
            console.log(this.user);
            this.idType = this.user.id
            console.log('tsuips_man: ' + this.idType)
          });
  }

  ajoutDesParametres() {

    this.storage.get('newIncident').then((value) => {
             this.incident.type = value;
             console.log('le id du type incident est: ' + this.incident.type); // Afficher le tupe d'incident sélectionné

             this.incident.tel = this.idType;
             this.incident.gravite = this.dangerosite;
             this.incident.title = this.typeIncident + '.' + this.incident.gravite + '.' + this.incident.type;
             //this.incident.media = this.photo;

             this.incidentService.setItem('newIncident', this.incident);

             console.log(this.incident);
    });


  }

  // Fonction permettant de prendre une photo
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });

    var imageUrl = image.webPath;
    console.log(imageUrl);

    const photo = 'data:image/jpeg;base64,' + image.base64String;

    // Enregistrement de la photo
    await this.savePhoto(photo);

    // Affecter l'URI de la photo à la variable photoUri
    this.photoUri = photo;

    // Afficher l'aperçu de la photo sur l'écran
    this.previewPhoto = photo;
  }

  // Fonction permettant de sauvegarder la photo
  async savePhoto(photo: string) {

    // Générer un nom de fichier unique avec le timestamp actuel
    const fileName = new Date().getTime() + '.jpeg';

    // Enregistrer la photo sur le périphérique
    const savedPhoto = await Filesystem.writeFile({
      path: fileName,
      data: photo,
      directory: Directory.Data,
      encoding: 'base64' as Encoding, // Utiliser 'base64' en tant que type Encoding
    });

    // Afficher l'URI de la photo sauvegardée dans la console
    console.log('Photo saved at:', savedPhoto.uri);
    this.incident.media = this.photo;
  }

}
