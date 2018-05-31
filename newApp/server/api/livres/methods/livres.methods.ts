import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Agence} from '../../Agence/publications/agence.publication';
import { Livres } from '../publications/cars.publications';
Meteor.methods({
	'addNewCar'(newCar) {
        // check(newCar, {
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
            newCar.dateCreated = new Date();
            newCar.disponible  = true;            
            var carId = Livres.insert(newCar);                
        }
    },
    'updateCar'(livre) {
        // check(newCar, {
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
            livre.dateUpdated = new Date();
            // livre.disponible  = true;            
            var carId = Livres.update({_id:livre._id},livre);                
        }
    },
    'removeLivres'(livres){
        if(Meteor.user() && livres.length > 0){
            let removed = Livres.remove({_id:{$in:livres}});
            return Boolean(removed);
        }else{
            return false;
        }
    }
});