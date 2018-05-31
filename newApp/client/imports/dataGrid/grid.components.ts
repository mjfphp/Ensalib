import { Component, ViewEncapsulation, NgZone, EventEmitter, Input,  Output } from '@angular/core';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Livres, Clients, Reservations, Classe } from '../app.components';
import styles from "./style.css";
import template from './grid.html';
@Component({
  selector: 'GridElements',
  template,
  styles,
  encapsulation: ViewEncapsulation.None
})
export class GridComponent {
  @Input() clientsIsActive;
  @Input() carsIsActive;
  @Input() reservationIsActive;
  @Input() classeIsActive;
  elementToFind;
  cars = [];
  rows = [];
  columns = [
  ];
  temp = [];
  selected: any[] = [];
  @Output() addcar: EventEmitter<any> = new EventEmitter();
  @Output() addclient: EventEmitter<any> = new EventEmitter();
  
  @Output() edit: EventEmitter<any> = new EventEmitter();
  
  propChoosed;
  
  constructor(private ngZone:NgZone){
     this.temp = this.rows;
     
     
  } 

  ngOnInit(){
    //this.elementToFind = Cars;
    console.log(this.carsIsActive);
    console.log(this.clientsIsActive);
    
    Tracker.autorun(() => {
      this.reInit();
    });
  }
  ngOnChanges(){
    this.selected = [];
    if(this.classeIsActive){
      this.elementToFind = Classe;
      console.log("Classes ============>");
      console.log(Classe.find().fetch());
      
      this.columns = [
        { name: 'Filière', prop: 'filiere' },
        { name: 'Nombre Année',prop: 'nbAnnee' },
        { name: 'Date Ouverture', prop: 'DateOuverture' }
      ];
    }else if(this.reservationIsActive){
      this.elementToFind = Reservations;
      this.columns = [
        { name: 'Code', prop: 'codeLivre' },
        { name: 'Titre',prop: 'titre' },
        { name: 'CIN Etudiant', prop: 'clientCin' },
        { name: 'Date Emprunt', prop: 'DateEmprunt' },                
        { name: 'Nom Etudiant', prop: 'nomEtudiant' },                
        // { name: 'Disponible',prop: 'disponible' },
      ];
    }else if(this.carsIsActive){
      this.elementToFind = Livres;
      this.columns = [
        { name: 'Code'      , prop: 'code' },
        { name: 'Titre'     , prop: 'titre' },
        { name: 'Categorie' , prop: 'Categorie' },
        { name: 'Prix'      , prop: 'prix' },
        { name: 'Achat'     , prop: 'dateAchat' },                
        { name: 'Edition'   , prop: 'dateEdition' },                
        { name: 'Disponible', prop: 'disponible' },
      ];
    }else if(this.clientsIsActive){
      this.elementToFind = Clients;
        this.columns = [
          { name: 'Nom'        , prop:"FirstName" },
          { name: 'Prenom'     , prop:"LastName" },
          { name: 'Télephone'  , prop:"PhoneNumber" },
          { name: 'Email'      , prop:"Email" },
          { name: 'Addresse'   , prop:"Address" },
          { name: 'CIN'        , prop:"Cin" }
        ];
    }
    this.propChoosed = this.columns[0].prop;
    this.reInit();
  }

  reInit(){
    this.ngZone.run(function(){
      let rows = this.elementToFind.find({}).fetch();
      console.log("===============>");
      console.log(this.elementToFind);
      console.log(rows);
      if(this.classeIsActive){
        this.temp = this.rows = rows.map((item) => {
          if(item.DateOuverture)
            item.DateOuverture = this.formatDate(item.DateOuverture);
          return item;
        });
      }else if(this.reservationIsActive){
        this.temp = this.rows = rows.map((item) => {
          item.DateEmprunt = this.formatDate(item.DateEmprunt);         
          return item;
        });
      }else if(this.carsIsActive){
        this.temp = this.rows = rows.map(function(item){
          item.dateAchat = this.formatDate(item.dateAchat);
          item.dateEdition = this.formatDate(item.dateEdition);
          console.log(item);          
          return item;
        }.bind(this));
      }else if(this.clientsIsActive){
        this.temp = this.rows = rows;
      }
    }.bind(this));
  }

  formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  
  onSelect(event) {
    //console.log('Event: select', event, this.selected);
  }

  onActivate(event) {
    //console.log('Event: activate', event);
  }

  Add(){
    if(this.clientsIsActive){
      this.addclient.emit(null);
    }if(this.carsIsActive){
      this.addcar.emit(null);
    }   
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if(val != ""){
      
      let rows = this.temp.filter(function(d) {
        return d[this.propChoosed].toString().toLowerCase().indexOf(val) !== -1 || !val;
      }.bind(this));
      this.ngZone.run(function(){
        this.rows = rows;
        //console.log(this.rows);        
      }.bind(this));
    }else{
      
      this.rows = this.temp;
    }
    
  }
  Edit(){
    this.edit.emit({car:this.carsIsActive,client:this.clientsIsActive,id:this.selected[0]._id});
    
    if(this.carsIsActive){
    }else if(this.clientsIsActive){

    }
  }
  Delete(){
    let idToRemove = [];
    if(this.reservationIsActive){
      if (confirm('Voulez vous supprimer les élements séléctionner?')) {
        idToRemove = this.selected.map(function(element) {
          return element._id;
        });
        if(idToRemove.length > 0)
        Meteor.call('removeReservation', idToRemove,(err,result) => {
          if(!err && result){
            this.selected = [];
            alert('Livres supprimer avec succès !');
          }else{
            alert('Erreur de suppression');             
          }          
        });
      }
    }
    else if(this.classeIsActive){
      if (confirm('Voulez vous supprimer les élements séléctionner?')) {
        idToRemove = this.selected.map(function(element) {
          return element._id;
        });
        if(idToRemove.length > 0)
        Meteor.call('removeClasse', idToRemove,(err,result) => {
          if(!err && result){
            this.selected = [];
            alert('Livres supprimer avec succès !');
          }else{
            alert('Erreur de suppression');             
          }          
        });
      }
    }
    else if(this.carsIsActive){
      if (confirm('Voulez vous supprimer les élements séléctionner?')) {
        console.log(this.selected);
        idToRemove = this.selected.map(function(element) {
            return element._id;
        });
        if(idToRemove.length > 0)
        Meteor.call('removeLivres', idToRemove,(err,result) => {
           if(!err && result){
            this.selected = [];
            alert('Livres supprimer avec succès !');
           }else{
            alert('Erreur de suppression');             
           }          
        });
        console.log(idToRemove);        
      }
    }else if(this.clientsIsActive){
      if (confirm('Voulez vous supprimer les élements séléctionner?')) {
        idToRemove = this.selected.map(function(element){
          return element._id;
        });
        if(idToRemove.length > 0)
        Meteor.call('removeEtudiants',idToRemove,(err,result)=>{
          if(!err && result){
            this.selected = [];          
            alert('Etudiants supprimer avec succès !');
           }else{
            alert('Erreur de suppression');             
           }
        });
      }
    }
  }
  typeChoose(prop){
    this.propChoosed = prop;
    console.log(prop);
    
  }

}