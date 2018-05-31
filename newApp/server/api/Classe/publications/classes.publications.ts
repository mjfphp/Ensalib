import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// import { Classe } from '../../Agence/publications/agence.publication';
export const Classe = new Mongo.Collection('Classe');

Meteor.publish('Classe', function () {
    var user = Meteor.user();
    
	if(user){
        var cars = Classe.find();    
		return cars;
	}
});