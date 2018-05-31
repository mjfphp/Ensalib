import {Meteor} from 'meteor/meteor';
import {Agence} from '../../Agence/publications/agence.publication';
import { Mongo } from 'meteor/mongo';
export const Clients = new Mongo.Collection('Clients');
Meteor.publish('client', function () {
	var user = Meteor.user();    
	if(user){
        var clients   = Clients.find();    
		return clients;
	}
});