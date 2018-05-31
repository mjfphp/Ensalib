import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Agence} from '../../Agence/publications/agence.publication';
import { Classe } from '../publications/classes.publications';
Meteor.methods({
	'addNewClasse'(newClasse) {
        // check(newClasse, {
        //     // carModel:String,
        //     // carNumber:String,
        //     // purchaseDate:Date,
        //     // dateAssurance:Date,
        //     // goalToAchieve:Number,
        //     // rentalPrice:Number,
        //     // allowHourReservation:Boolean
        // });
        
        var user = Meteor.user();
        if(user){            
            newClasse.dateCreated = new Date();
            newClasse.disponible  = true;            
            var carId = Classe.insert(newClasse);                
        }
    },
    'updateClasse'(newClasse) {
        // check(newClasse, {
        //     // carModel:String,
        //     // carNumber:String,
        //     // purchaseDate:Date,
        //     // dateAssurance:Date,
        //     // goalToAchieve:Number,
        //     // rentalPrice:Number,
        //     // allowHourReservation:Boolean
        // });
        
        var user = Meteor.user();
        if(user){            
            newClasse.dateUpdated = new Date();
            var carId = Classe.update({_id:newClasse._id},newClasse);                
        }
    },
    'removeClasse'(classes){
        if(Meteor.user() && classes.length > 0){
            let removed = Classe.remove({_id:{$in:classes}});
            return Boolean(removed);
        }else{
            return false;
        }
    }
});