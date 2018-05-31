import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {Meteor} from 'meteor/meteor';
import {Agence} from '../../Agence/publications/agence.publication';
import {Clients} from '../publications/client.publications';
Meteor.methods({
	'addNewClient'(newClient) {
        // check(newClient, {
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
            newClient.dateCreated = new Date();            
            
            // if(getAgence && getAgence.Abonnement){
            var clientId = Clients.insert(newClient);
                // getAgence.ClientsRegistred.push(clientId);
                // Agence.update({_id:getAgence._id},{$set:{ClientsRegistred:getAgence.ClientsRegistred}});                            
            // }
        }
    },
    'updateClient'(client) {
        // check(client, {
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
            client.dateUpdated = new Date();            
            
            // if(getAgence && getAgence.Abonnement){
            var clientId = Clients.update({_id:client._id},client);
                // getAgence.ClientsRegistred.push(clientId);
                // Agence.update({_id:getAgence._id},{$set:{ClientsRegistred:getAgence.ClientsRegistred}});                            
            // }
        }
    },
    'removeEtudiants'(etudiantToRemove){
        if(Meteor.user() && etudiantToRemove && etudiantToRemove.length > 0){
            let testRemove = Clients.remove({_id:{$in:etudiantToRemove}});
            return Boolean(testRemove);    
        }else{
            return false;
        }
    }
});