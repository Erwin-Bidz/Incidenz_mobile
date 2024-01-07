import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  password!: string;
  tel!: string;

  constructor(private http: HttpClient, private router: Router) { }

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
    
    // Envoi de la requête POST à l'API
    this.http.post<any>('http://localhost:8080/api/users/login/', body)
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            const token = response.headers.get('Authorization');
            this.router.navigate(['../menu', { token: token }]);
          } else {
            alert('Erreur de connexion');
          }
        },
        (error) => {
          console.log(error);
          alert('Erreur de connexion');
        },
      );
  }
  

}
