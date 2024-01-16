import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import{ AlertController} from'@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password!: string;
  tel!: string;
  errorMessage: string = '';
  token = '';


  constructor(private http: HttpClient, private router: Router, public alertController:AlertController) { }

  ngOnInit() {
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
                  this.openDialog();
                  this.router.navigate(['home/menu', { token: this.token }]);
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
