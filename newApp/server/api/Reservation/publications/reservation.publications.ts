import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Reservations = new Mongo.Collection('Reservations');
Meteor.publish('Reservations', function () {
	var user = Meteor.user();    
	console.log(user);
	
	if(user){
        var reservation = Reservations.find({});
		return reservation;
	}
});