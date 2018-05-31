export class User {
	// public firstName: 	string;
 //    public lastName: 	string;
 //    public email: 		string;
 //    public phone: 		string;
 //    public password: 	string;
 //    public city: 		string;
  constructor(
    public firstName: 	string,
    public lastName: 	string,
    public email: 		string,
    public password: 	string,
    public phone: 		string,
    public city: 		string
  ) { 
  		let testValidateEmail = this.validateEmail(email);
  		if(this.firstName.length > 2 && this.lastName.length > 2 && this.city.length >  2 && testValidateEmail && password.length > 8 )

   }
    validateEmail(email) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}

}