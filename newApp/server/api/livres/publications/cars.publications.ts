import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Agence } from '../../Agence/publications/agence.publication';
export const Livres = new Mongo.Collection('Livres');

Meteor.publish('Livres', function () {
    var user = Meteor.user();
    
	if(user){
        var livres = Livres.find();    
		return livres;
	}else{
		return Livres.find({disponible:true});		
	}
});