import 'zone.js';
import 'reflect-metadata';
 
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Meteor } from 'meteor/meteor';
import { BrowserModule } from '@angular/platform-browser';
import { AppModule } from './imports/app.module';
import { enableProdMode } from '@angular/core';
Meteor.startup(() => {
  //enableProdMode();
  platformBrowserDynamic().bootstrapModule(AppModule);
});

