import { Component, ViewEncapsulation, NgZone, EventEmitter, Input, Output } from '@angular/core';
import { Tracker } from 'meteor/tracker';
import { NativeDateAdapter } from '@angular/material';
import { Meteor } from 'meteor/meteor';
// import styles from "./style.css";
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import {Observable} from 'rxjs/Observable';
import { Agency, Livres } from '../../app.components';

// import { DialogData } from '../../matDialog/matDialog.components';
import template from './newCar.html';

@Component({
  selector: 'formCar',
  template
})
export class NewCarComponent {
  //filteredStates: Observable<any[]>;
  @Input() editCars;
  @Input() addCars;
  @Input() idToEdit;
  
  private filtredCars;
  private myAgency:any;
  private isloading;
  private registredCars;
  
  private newcar:any = new CarClass();
  
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

  CodeFromControl = new FormControl('',
    Validators.required    
  );

  constructor(private ngZone: NgZone,public dialog: MatDialog){
    this.isloading = true;
    this.registredCars = [];
    this.filtredCars = [];
  }

  ngOnInit(){
    if(this.editCars){
      this.registredCars = Livres.find({}).fetch();            
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
    if(this.editCars){
      console.log(this.newcar.carNumber);
      this.filterStates(this.newcar.carNumber);      
      let selectCar = Livres.findOne({carNumber:this.newcar.carNumber});
      if(selectCar){
        this.newcar = selectCar;
      }else if(this.newcar.carModel){
        let carNumber = this.newcar.carNumber;
        this.newcar = new CarClass();
        this.newcar.carNumber = carNumber;
      }
    }
  }
  submit(){

    console.log(this.ModelCarFormControl.errors);
    console.log(this.CarNumberFormControl.errors);
    console.log(this.PurchaseDateFormControl.errors);
    console.log(this.RentalPriceFormControl.errors);
    
    
    
    if(!this.ModelCarFormControl.errors  && !this.PurchaseDateFormControl.errors &&  !this.RentalPriceFormControl.errors){      
      //this.isloading = true;
      if(this.addCars){
        Meteor.call('addNewCar',this.newcar,function(err,result){
          if(err){
            alert("Error add car ");
          }else{
            alert("Add Successfully");
          }
          console.log(err);
          console.log(result);
        }.bind(this));
      }else if(this.editCars){
        alert('updatedCar');
        Meteor.call('updateCar',this.newcar,function(err,result){
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
    this.newcar = new CarClass();
    
    if(this.editCars){
      this.registredCars = Livres.find({}).fetch();      
      
    }
    if(this.idToEdit){
      this.newcar = Livres.findOne({_id:this.idToEdit});
    }
  }
  filterStates(carNumber: string) {    
    if(carNumber)
    this.filtredCars = this.registredCars.filter(car =>
      car.carNumber.toLowerCase().indexOf(carNumber.toLowerCase()) === 0
    );
  }
}

class CarClass{
  private titre:String;
  private categorie:String;
  private dateAchat;
  private dateEdition;
  // private goalToAchieve:number;
  private prix:number;
  private disponible:boolean = false;
  private code:String;
}