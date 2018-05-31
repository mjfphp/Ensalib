import { Component, ViewEncapsulation, NgZone, EventEmitter, Input, Output } from '@angular/core';
import { Tracker } from 'meteor/tracker';
import { NativeDateAdapter } from '@angular/material';
import { Meteor } from 'meteor/meteor';
// import styles from "./style.css";
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { Agency, Livres } from '../app.components';
import jsPDF from 'jspdf';
import { Random } from 'meteor/random';
// import { DialogData } from '../../matDialog/matDialog.components';
import template from './classe.html';

@Component({
  selector: 'formclasse',
  template
})
export class ClasseComponent {
  //filteredStates: Observable<any[]>;
  @Input() editCars;
  @Input() addCars;
  @Input() idToEdit;
  
  private filtredCars;
  private myAgency:any;
  private isloading;
  private registredCars;
  private idReservation;
  
  private newcar:any = new Classe();
  
  ModelCarFormControl = new FormControl('',
    Validators.required
  )

  CarNumberFormControl = new FormControl('',
    Validators.required
  )

  PurchaseDateFormControl = new FormControl('',
    Validators.required
  )
  
  RentalPriceFormControl = new FormControl('',
    Validators.required
  )

  DateBirthFormControl = new FormControl('',
    Validators.required
  )
  constructor(private ngZone: NgZone,public dialog: MatDialog){
    this.isloading = true;
    this.registredCars = [];
    this.filtredCars = [];
  }

  ngOnInit(){
    this.idReservation = Random.id(13);
    // this.newcar = new ReservationClass();

    console.log(this.addCars);
    console.log(this.editCars);
    console.log(this.idToEdit);
    
    if(this.editCars){
      this.registredCars =  Livres.find({}).fetch();
            
    }
    Tracker.autorun(() => { 
      this.ngZone.run(function(){   
        this.myAgency = Agency.findOne({});
        if(this.myAgency){
          this.isloading = false;
        }
      }.bind(this));
    });
  }
  searchCarNumber(){
    //if(this.editCars){
      console.log(this.newcar.codeLivre);
      this.filterStates(this.newcar.codeLivre);      
      let selectCar =   Livres.findOne({code:this.newcar.codeLivre});
      // if(selectCar){
        //this.newcar = selectCar;
          // }else if(this.newcar.carModel){
          //   let carNumber = this.newcar.carNumber;
          //   this.newcar = new ReservationClass();
          //   this.newcar.carNumber = carNumber;
          // }
    //}
  }
  submit(){
   if(!this.CarNumberFormControl.errors && !this.ModelCarFormControl.errors && !this.DateBirthFormControl.errors){      
      //this.isloading = true;
      console.log(this.addCars);
      console.log(this.editCars);
      
      if(this.addCars){
        Meteor.call('addNewClasse',this.newcar,function(err,result){
          if(err){
            alert("Error add car ");
          }else{
            alert("Add Successfully");
          }
          console.log(err);
          console.log(result);
        }.bind(this));
      }else if(this.editCars){
        // alert('updatedCar');
        Meteor.call('updateClasse',this.newcar,function(err,result){
          if(err){
            alert("Error add car ");
          }else{
            alert("Add Successfully");
          }
          console.log(err);
          console.log(result);
        }.bind(this));
      }
      
    }
  }
  ngOnChanges(){
    this.newcar = new Classe();
    
   
      this.registredCars =  Livres.find({}).fetch();      
    if(this.idToEdit){
      this.newcar =   Livres.findOne({_id:this.idToEdit});
    }
  }
  filterStates(carNumber: string) {
    
    if(carNumber)
    this.filtredCars = this.registredCars.filter(car =>
      car.code.toLowerCase().indexOf(carNumber.toLowerCase()) === 0
    );
  }
}

class Classe{
  private filiere:String;
//   private carNumber:String;
  private nbAnnee;
  private DateOuverture;
}