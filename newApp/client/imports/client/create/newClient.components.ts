import { Component, NgZone, Input } from '@angular/core';
import { Tracker } from 'meteor/tracker';
import { NativeDateAdapter } from '@angular/material';
import { Meteor } from 'meteor/meteor';
// import styles from "./style.css";
import { Mongo } from 'meteor/mongo';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { Agency, Clients } from '../../app.components';
// import { Clients } from '../../app.components';

// import { DialogData } from '../../matDialog/matDialog.components';
import template from './newClient.html';
// const Agency = new Mongo.Collection('Agences');
const EMAIL_REGEX =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

@Component({
  selector: 'formClient',
  template
})
export class NewClientComponent {
  private myAgency:any;
  private isloading;
  private newclient:any = new ClientClass();
  @Input() idToEdit;
  @Input() isEdited;
  
    
  FirstNameFormControl = new FormControl('',
    Validators.required
  );

  LastNameFormControl = new FormControl('',
    Validators.required
  );

  PhoneNumberFormControl = new FormControl('',
    Validators.required
  );

  EmailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)
  ]);

  AddresseFormControl = new FormControl('',
    Validators.required
  );

  CINFormControl = new FormControl('',
    Validators.required
  )

  // DrivernumberFormControl = new FormControl('',
  //   Validators.required
  // )
  
  DateBirthFormControl = new FormControl('',
    Validators.required
  )

  constructor(private ngZone: NgZone,public dialog: MatDialog){
    this.isloading = true;
  }

  ngOnInit(){
    Tracker.autorun(() => { 
      this.ngZone.run(function(){   
        this.myAgency = Agency.findOne({});
        if(this.myAgency){
          this.isloading = false;
        }
      }.bind(this));
    });
  }

  submit(){
  
   if(!(this.FirstNameFormControl.errors || this.LastNameFormControl.errors || this.PhoneNumberFormControl.errors ||
        this.CINFormControl.errors  || this.DateBirthFormControl.errors 
        )){
          if(this.isEdited){
            Meteor.call('updateClient',this.newclient,function(err,result){
              if(err){
                alert("Error update etudiant ");
                // let dialogRef = this.dialog.open(DialogData, {
                //   data: { message:"Error add car" , title:"Error"};
                // });
              }else{
                alert("Updated Successfully");
                // let dialogRef = this.dialog.open(DialogData, {
                //   data: { message:"Add Successfully" , title:"Message"};
                // });
              }
            });
          } else{
            Meteor.call('addNewClient',this.newclient,function(err,result){
              // this.ngZone.run(function(){  
              //   this.isloading = false;
              // }.bind(this));
              if(err){
                alert("Error add etudiant ");
                // let dialogRef = this.dialog.open(DialogData, {
                //   data: { message:"Error add car" , title:"Error"};
                // });
              }else{
                alert("Add Successfully");
                // let dialogRef = this.dialog.open(DialogData, {
                //   data: { message:"Add Successfully" , title:"Message"};
                // });
              }
              console.log(err);
              console.log(result);
            }.bind(this));
          }     
      //this.isloading = true;
      
    }
  }

  ngOnChanges(){
    if(this.idToEdit){
      this.newclient = Clients.findOne({_id:this.idToEdit});
    }
  }

}

class ClientClass{
  private FirstName:String;
  private LastName:String;
  private PhoneNumber:String;
  private Email:String;
  private Address:String;
  private Cin:String;
  private Drivernumber:String;
  private DateBirth:Date;  
//   private client
}