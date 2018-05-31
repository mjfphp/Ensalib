import { Component } from '@angular/core';
import template from "./app.html";
import styles from './indigo-pink.css';
import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Meteor.subscribe('users');
Meteor.subscribe('Agency');
Meteor.subscribe('client');
Meteor.subscribe('Livres');
Meteor.subscribe('Reservations');
Meteor.subscribe('Classe');

export const Agency  = new Mongo.Collection('Agences');
export const Livres    = new Mongo.Collection('Livres');
export const Clients = new Mongo.Collection('Clients');
export const Reservations = new Mongo.Collection('Reservations');
export const Classe = new Mongo.Collection('Classe');

@Component({
  selector: 'my-app',
  template,
  styles
})
export class MyApp {}