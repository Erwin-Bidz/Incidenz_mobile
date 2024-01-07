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

  constructor(private http: HttpClient, private router: Router) {
    this.router = router;
  }

  ngOnInit() {}

  inscription() {
    // console.log("nom:", this.nom);
    // console.log("prenom:", this.prenom);
    // console.log("email:", this.email);
    // console.log("password:", this.password);
    // console.log("tel:", this.tel);
    const infosUtilisateur = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      tel: this.tel
    };
  
    this.http.post('http://localhost:8080/api/users/register/', infosUtilisateur)
      .subscribe(response => {
        // Enregistrement réussi, rediriger vers la page de menu
        this.router.navigate(['../menu']);
      }, error => {
        // Gestion des erreurs
        console.error("Erreur lors de l'inscription:", error);
        // Afficher un message d'erreur à l'utilisateur
      });
  }
  
  
}
