import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private router: Router) {
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
          // Enregistrement réussi, rediriger vers la page de menu
          this.router.navigate(['home/menu']);
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


}
