import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IncidentService } from '../../../services/incident.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.page.html',
  styleUrls: ['./step1.page.scss'],
})
export class Step1Page implements OnInit {

  Data : any
  //image = 'assets/panneau-casse.png'
  image = 'assets/incident_type3.png'

  constructor(public  http: HttpClient, private incidentService: IncidentService, private router: Router) {
    this.readAPI('http://localhost:8080/api/typeIncidents/').subscribe((data) =>{ this.Data = data; console.log(data);});
  }

  ngOnInit() {
  }

  readAPI(URL: string){
      return this.http.get(URL);
  }

  selectedType(incident: string, id: number) {
         this.incidentService.setItem('incidentType', incident);
         this.incidentService.setItem('newIncident', id);
         this.router.navigate(['home/menu/step1/step2']);
  }


  incident1 = {
    nom: 'Accident de voiture',
    img: 'assets/accident-de-voiture.png',
    company: ''
  }

  incident2 = {
    nom: 'Ordures sur voie publique',
    img: 'assets/bac-a-poussiere.png',
    company: 'Hysacam'
  }

  incident3 = {
    nom: 'Eclairage de la rue',
    img: 'assets/eclairage-public (1).png',
    company: 'SIC'
  }

  incident4 = {
    nom: 'Feux de signalisaton',
    img: 'assets/feux-de-circulation.png',
    company: ''
  }

  incident5 = {
    nom: 'Incendie',
    img: 'assets/gaz-naturel.png',
    company: 'pompiers'
  }

  incident6 = {
    nom: 'Nids de poule',
    img: 'assets/nid-de-poule.png',
    company: ''
  }

  incident7 = {
    nom: 'Panneaux endommagés',
    img: 'assets/panneau-casse.png',
    company: ''
  }

  incident8 = {
    nom: 'Poteaux électriques',
    img: 'assets/poteau-electrique.png',
    company: ''
  }



  Incidents = [this.incident1, this.incident2, this.incident3, this.incident4, this.incident5, this.incident6, this.incident7, this.incident8]


}
