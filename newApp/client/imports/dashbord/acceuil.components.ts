import { Component, ViewEncapsulation, NgZone } from '@angular/core';
import template from "./acceuil.html";
import styles from  "./acceuil.css";
import * as $ from "jquery";
import {Meteor} from 'meteor/meteor';
import {Router} from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { BreakpointObserver } from '@angular/cdk/layout';


// import { MdTooltipModule, MdInputModule, MdDialog, MdDialogConfig   } from '@angular/material';
@Component({
  selector: 'acceuil',
  template,
  styles
})
export class AcceuilComponent {
  currentUserId;
  viewCars:boolean;
  addCar:boolean;
  editCar:boolean;
  viewClients:boolean;
  addClient:boolean;
  editClient:boolean;
  viewReservations:boolean;
  addReservations:boolean;
  editReservation:boolean;
  dashboard:boolean;
  elementInGrid;
  menuIsOpen:boolean;
  idEdited:String;
  viewClasse:boolean;
  addClasse:boolean;
  editClasse:boolean;
  constructor(private router: Router,private ngZone: NgZone){
    this.viewCars         = false;
    this.addCar           = false;
    this.editCar          = false;
    this.viewClients      = false;
    this.addClient        = false;
    this.editClient       = false;
    this.viewReservations = false;
    this.addReservations  = false;
    this.editReservation  = false;
    this.viewClasse       = false;
    this.addClasse        = false;
    this.editClasse       = false;
    this.dashboard        = true;
    this.menuIsOpen       = false;
    this.elementInGrid    = 'cars';
  }
  
  ngOnInit(){
    if(!Meteor.userId()){
        this.ngZone.run(function(){
            this.router.navigate(['/admin']);
        }.bind(this));
    }
    $("#leftside-navigation .sub-menu > a").click(function(e) {
      $("#leftside-navigation ul ul").slideUp(), $(this).next().is(":visible") || $(this).next().slideDown(),
      e.stopPropagation();
    });
  }
  logout(e){
    e.preventDefault();
    Meteor.logout(function(){
      this.ngZone.run(function(){
        this.router.navigate(['/admin']);
      }.bind(this));
    }.bind(this));
   
  }

  initForm(e){
    if(e){
      e.preventDefault();
      e.stopPropagation();      
    }
    this.idEdited         = "";
    this.viewCars         = false;
    this.addCar           = false;
    this.editCar          = false;
    this.viewClients      = false;
    this.addClient        = false;
    this.editClient       = false;
    this.viewReservations = false;
    this.addReservations  = false;
    this.editReservation  = false;
    this.dashboard        = false;
    this.menuIsOpen       = false;
    this.viewClasse       = false;
    this.addClasse        = false;
    this.editClasse       = false;      
    return true;
  }

  openMenu(){
    this.menuIsOpen = true;
  }
  hideMenu(e){
    // e.preventDefault();
    // e.stopPropagation(); 
    this.menuIsOpen = false;
  }

  edit(e){
    this.initForm(null);
    this.editCar = e.car;
    this.editClient = e.client;
    this.idEdited   = e.id;
    
  }
  
}