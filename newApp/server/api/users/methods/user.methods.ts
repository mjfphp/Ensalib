import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import {Meteor} from 'meteor/meteor';

Meteor.methods({
	'user.insert'(user) {
		check(user, {
		  email: String,
		  password: String,
		  phone: String,
		  city: String,
		  profile: { name: { first: String, last: String } }
		});

		//users.forEach(({ email, password, profile, roles, phone, city }) => {
		  const userExists   = Accounts.findUserByEmail(user.email);
		  user.profile.phone = user.phone;
		  user.profile.city  = user.city;

		  if (!userExists) {
		    const userId = Accounts.createUser(user);
		    //Roles.addUsersToRoles(userId, roles, <my whatever global role group>);
		  }
		//});
	},
	'connectAgenceUser'(user){
		check(user, {
		  email: String,
			password: String
		});
		var userExists   = Accounts.findUserByEmail(user.email);
		if(userExists && userExists.isAgence){
			return true;
		}else{
			return false;
		}
	}
});	