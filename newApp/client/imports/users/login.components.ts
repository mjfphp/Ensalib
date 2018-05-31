import { Component } from '@angular/core';
import template from "./login.html";
import styles from "./style.css";
import {Router} from '@angular/router';
import {Meteor} from 'meteor/meteor';

@Component({	
  selector: 'login',
  template,
  styles
})
export class UserComponents {
	private loginView;
	private errors;
	private message;
	private email;
	private password;
	constructor(private router: Router){
		this.loginView = false;
		this.message = "";
		this.errors = [];
	}
	clickToLog(event){
		console.log(event);
		event.preventDefault();
		event.stopPropagation();
		this.loginView = true;
	}
	hidePopus(){
		this.loginView = false;		
	}
	login(): void {
	    //this.resetErrors();

	    let email: string = this.email;
	    let password: string = this.password;

	    Meteor.loginWithPassword(email, password, (error) => {
	      if (error) {
	        this.errors.push(error.reason || "Unknown error");
	      }
	      else {
	       	
	      }
  		});
  	}

  	signup(): void {
    	this.resetErrors();

//	    Accounts.createUser(this.credentials, (error) => {
//	      if (error) {
//	        this.errors.push(error.reason || "Unknown error");
//	      }
//	      else {
//	        this.isDropdownOpen = false;
//	        this._resetCredentialsFields();
//	      }
//	    });
  	}

  	resetErrors(): void {
  		this.message = "";
		this.errors = [];
  	}

  	clickInPopup(event){
  		//event.preventDefault();
		event.stopPropagation();
  	}

  	logout(): void {
	    Meteor.logout();
	    // this.isDropdownOpen = false;
	}

	goToRegister(): void {
		this.router.navigate(['/register']);
	}
}