import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Agence} from '../../Agence/publications/agence.publication';
import {Reservations} from '../publications/reservation.publications';
import {Livres} from '../../livres/publications/cars.publications';
import {Clients} from '../../clients/publications/client.publications';
Meteor.methods({
	'addNewReservation'(reservation) {
        // check(reservation, {
        //      FirstName:String,
        //      LastName:String,
        //      PhoneNumber:String,
        //      Email:String,
        //      Address:String,
        //      Cin:String,
        //      Drivernumber:String,
        //      DateBirth:Date
        // });
        var user = Meteor.user();
        if(user){
            var livre:any = Livres.findOne({_id:reservation.codeLivre});
            var etudiant:any = Clients.findOne({Cin:reservation.clientCin});
            if(livre && etudiant){
                reservation.titre = livre.titre;
                reservation.nomEtudiant = etudiant.FirstName + " " + etudiant.LastName ;
                reservation.dateCreated = new Date();
                var testAdd = Reservations.insert(reservation);
                Livres.update({_id:livre._id},{$set:{disponible:false}});
                return Boolean(testAdd);
            }else{
                return false;
            }
        }
    },
    'updateReservation'(reservation) {
        // check(reservation, {
        //      FirstName:String,
        //      LastName:String,
        //      PhoneNumber:String,
        //      Email:String,
        //      Address:String,
        //      Cin:String,
        //      Drivernumber:String,
        //      DateBirth:Date
        // });
        var user = Meteor.user();
        if(user){
            var livre:any = Livres.findOne({_id:reservation.codeLivre});
            var etudiant:any = Clients.findOne({Cin:reservation.clientCin});
            if(livre && etudiant){
                reservation.titre = livre.titre;
                reservation.nomEtudiant = etudiant.FirstName + " " + etudiant.LastName ;
                reservation.dateCreated = new Date();
                var testAdd = Reservations.update({_id:reservation._id},reservation);
                Livres.update({_id:livre._id},{$set:{disponible:false}});
                return Boolean(testAdd);
            }else{
                return false;
            }
        }
    },
    'removeReservation'(toRemove){
        if(Meteor.user() && toRemove && toRemove.length > 0){
            let testRemove = Reservations.remove({_id:{$in:toRemove}});
            return Boolean(testRemove);    
        }else{
            return false;
        }
    }
});