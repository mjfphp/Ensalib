import {Meteor} from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Agence = new Mongo.Collection('Agences');
Meteor.publish('Agency', function () {
    var user = Meteor.user();
    
	if(user){
        var agence = Agence.find({});        
		return agence;
	}
});