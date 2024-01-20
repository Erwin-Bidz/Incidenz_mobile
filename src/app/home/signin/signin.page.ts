import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import{ AlertController} from'@ionic/angular';
import { IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  nom!: string;
  prenom!: string;
  email!: string;
  password!: string;
  tel!: string;
  errorMessage: string = '';
  token = '';

  constructor(private http: HttpClient, private router: Router, public alertController:AlertController, private incidentService: IncidentService) {
    this.router = router;
  }

  ngOnInit() {}

  inscription() {

    const infosUtilisateur = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      tel: this.tel
    };

    if ((!this.nom)||(!this.prenom)||(!this.email)||(!this.password)||(!this.tel)){
      console.log("Champs pas tous remplis");
      this.errorMessage = "Veuillez remplir tous les champs!";
    }else{
      this.http.post('http://localhost:8080/api/users/register/', infosUtilisateur)
        .subscribe(response => {
          //Appel de la fonction login après authetification
          this.connexion();
          // Enregistrement réussi, rediriger vers la page de menu
          //this.router.navigate(['home/menu']);
        }, error => {
          // Gestion des erreurs
          console.error("Erreur lors de l'inscription:", error.error);
          if(error.error.error == 'email is not valid'){
            this.errorMessage = "Adresse email non valide.";
          }else{
            // Afficher un message d'erreur à l'utilisateur
            this.errorMessage = "Une erreur s'est produite lors de votre inscription.";
          }
      });
    }


  }

   connexion() {
      // Affichage en console pour le déboggage
      console.log("tel:", this.tel);
      console.log("password:", this.password);

      const body = {
        tel: this.tel,
        password: this.password,
      };

      if ((!this.tel)||(!this.password)){
        console.log("Champs pas tous remplis");
        this.errorMessage = "Veuillez remplir tous les champs!";
      }else{
        // Envoi de la requête POST à l'API
            this.http.post<any>('http://localhost:8080/api/users/login/', body, { observe: 'response' })
              .subscribe(
                (response: HttpResponse<any>) => {
                    console.log(response);
                    const token = response.headers.get('Authorization');
                    //this.token = JSON.stringify(response.body.token);
                    this.token = response.body.token;
                    //localStorage.setItem('token', this.token);
                    console.log(this.token);
                    this.incidentService.setItem('token', this.token);
                    this.openDialog();
                    this.router.navigate(['home/menu', { token: this.token }]);
                    //this.router.navigate(['home/menu']);
                },
                (error) => {
                  if (error.status == 403) {
                    console.log(error);
                    this.errorMessage = "Mot de passe incorrect";
                  }else{
                    this.errorMessage = "Erreur de connexion";
                  }
                },
              );
      }

    }

    async openDialog() {
            const alert=await this.alertController.create(
              {header: 'Authentification réussie',
              subHeader: '',
              message: '',
              buttons: ['Ok']
            });
          await alert.present()
    }


}
