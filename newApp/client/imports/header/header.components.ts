import { Component } from '@angular/core';
import template from "./header.html";
// import styles from "./style.css";
import {Router} from '@angular/router';
// import {Meteor} from 'meteor/meteor';

@Component({	
  selector: 'header',
  template,
//   styles
})
export class HeaderComponents {
    constructor(private router: Router){
		
  	}
    goToRegister(): void {
	  	this.router.navigate(['/register']);
	  }
}