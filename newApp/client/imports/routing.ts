import { RouterModule, Routes } from '@angular/router';
import { UserComponents } 		from './users/login.components';
import { RegisterComponents } 	from './users/register.components';
import { AcceuilComponent } from './dashbord/acceuil.components';
import { AdminComponent  } from './admin/admin.components';
import {Meteor} from 'meteor/meteor';


export const appRoutes: Routes = [
  { path: 'login',  component: UserComponents },
  { path: 'register', component: RegisterComponents },
  { path: 'admin', component: AdminComponent },
  { path: 'acceuil', component: AcceuilComponent },
  { path: '',
    redirectTo: '/admin',
    pathMatch: 'full'
  }
];
