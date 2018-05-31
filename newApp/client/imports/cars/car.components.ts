import { Component, ViewEncapsulation, NgZone, EventEmitter,  Output } from '@angular/core';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Livres } from '../app.components';
import styles from "./style.css";
import template from './cars.html';
@Component({
  selector: 'test',
  template,
  styles,
  encapsulation: ViewEncapsulation.None
})
export class CarComponent {
  cars = [];
  rows = [];
  columns = [
    { prop: 'CodeLivre' },
    { name: 'Categorie' },
    { name: 'DateAjout' },
    { name: 'Titre' },
    { name: 'Prix' }
  ];
  temp = [];
  selected: any[] = [];
  @Output() addcar: EventEmitter<any> = new EventEmitter();
  
  constructor(private ngZone:NgZone){
     this.temp = this.rows;
  } 

  ngOnInit(){
    Tracker.autorun(() => {
      this.ngZone.run(function(){
        let rows = Livres.find({}).fetch();
        this.temp = this.rows = rows.map(function(item){
          item.dateAssurance = this.formatDate(item.dateAssurance);
          console.log(item);          
          return item;
        }.bind(this));
        //console.log(this.rows);        
      }.bind(this));
    });
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

  AddCar(){
    this.addcar.emit(null);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    if(val != ""){
      console.log('------------------');
      console.log(val);
      
      let rows = this.temp.filter(function(d) {
        console.log(d);
        
        return d.carNumber.toLowerCase().indexOf(val) !== -1 || !val;
      });
      this.ngZone.run(function(){
        this.rows = rows;
        //console.log(this.rows);        
      }.bind(this));
    }else{
      console.log(val);
      
      this.rows = this.temp;
    }
    
  }

}