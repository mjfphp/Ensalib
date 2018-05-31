import {Meteor} from 'meteor/meteor';

Meteor.publish('users', function () {
	if(Meteor.userId()){
		return Meteor.users.find({_id:Meteor.userId()}, {
			fields: { emails: 1,isAgence:1 }
		});
	}else{
		return [];
	}
  
});