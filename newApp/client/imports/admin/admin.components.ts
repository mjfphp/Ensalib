import { Component, NgZone } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import styles   from "./style.css";
import template from './admin.html';
import {Meteor} from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

const EMAIL_REGEX =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
@Component({
  selector: 'admin',
  template,
  styles
})
export class AdminComponent {
    private hide;
    private email;
    private password;
    private currentUserId;
    constructor(private router: Router,
                private ngZone: NgZone
                ){
        this.hide = true;
        this.email = "";
        this.password = "";
    }
    ngOnInit(){
        Tracker.autorun(() => {
            if(this.currentUserId != Meteor.userId()){ 
                let isAgence: boolean = (Meteor.user() && Meteor.user().isAgence) ? true : false;
                if(isAgence){
                    this.ngZone.run(function(){
                        this.router.navigate(['/acceuil']);
                    }.bind(this));                    
                }
            }
        });
        
        
    }
    emailFormControl = new FormControl('', [
            Validators.required,
            Validators.pattern(EMAIL_REGEX)
        ]);
    
    passwordFormControl = new FormControl('',
        Validators.required
    )
    connect(){
        if(!this.passwordFormControl.errors && !this.emailFormControl.errors){
            let user = new UserAgence(this.email,this.password);
            Meteor.call('connectAgenceUser',user,function(err,result){
                if(!err){
                    Meteor.loginWithPassword(this.email,this.password, (error) => {
                        if (error) {
                           // this.errors.push(error.reason || "Unknown error");
                        }
                        else {
                            this.ngZone.run(function(){
                                this.router.navigate(['/acceuil']);
                            }.bind(this));
                        }
                    });
                }
            }.bind(this));
        }
    }
}
class UserAgence{
    public email;
    public password;
    constructor(email,password){
        this.email    = email;
        this.password = password;
    }
}