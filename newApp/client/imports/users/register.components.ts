import { Component } from '@angular/core';
import {Router} from '@angular/router';
import template from "./register.html";
import styles from "./style.css";
import {Meteor} from 'meteor/meteor';

@Component({	
  selector: 'register',
  template,
  styles
})
export class RegisterComponents {
	private loginView;
	private errors;
	private message;
	private email: string;
	private password: string;
	private firstName: string;
	private lastName: string;
	private phone: string;
	private city: string;
	constructor(private router: Router){
		this.loginView = false;
		this.message = "";
		this.errors = [];
		this.email = "";
		this.password = "";
	}
	clickToLog(event){
		// console.log(event);
		// event.preventDefault();
		// event.stopPropagation();
		// this.loginView = true;
		this.router.navigate(['/login']);
		
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

	    // Accounts.createUser(this.credentials, (error) => {
	    //   if (error) {
	    //     this.errors.push(error.reason || "Unknown error");
	    //   }
	    //   else {
	    //     this.isDropdownOpen = false;
	    //     this._resetCredentialsFields();
	    //   }
	    // });
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

	signUp(): void {
		let user = {profile: { name: { first: this.firstName, last: this.lastName } },email: this.email, phone: this.phone, city: this.city, password: this.password};
		console.log("=========================");
		console.log(user);
		Meteor.call('user.insert',user,function(err,result){
			console.log(err);
			console.log(result);
		});
	}
}