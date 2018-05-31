import { NgModule } from '@angular/core';
import { MyApp } from './app.components';
import { BrowserModule } from '@angular/platform-browser';
// import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { UserComponents } from './users/login.components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponents } from './users/register.components';
import {APP_BASE_HREF} from '@angular/common';
import { appRoutes } from './routing';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './dashbord/acceuil.components';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CarComponent } from './cars/car.components';
import { AdminComponent } from './admin/admin.components';
import { HeaderComponents } from './header/header.components';
import { NewCarComponent } from './cars/create/newCar.components';
import { NewClientComponent } from './client/create/newClient.components';
import { APP_DATE_FORMATS } from './FormatDate';
import { AppDateAdapter } from './FormatDate';
import {DateAdapter} from '@angular/material';
import {MAT_DATE_FORMATS} from '@angular/material';
import { GridComponent } from './dataGrid/grid.components';
import { ChartComponent } from './charts/charts.components';
import { NewReservationComponent } from './reservation/reservations.components';
// import { DialogData } from './matDialog/matDialog.components';
//
import { ClasseComponent } from './classes/classe.components';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  // MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
  imports: [
  	BrowserModule,  	
    FormsModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CdkTableModule,
    ChartsModule,
    NgxDatatableModule,
    
    /////Materiel design 
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    // MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,


    //* end */
  ],
  declarations: [
    MyApp,
    UserComponents,
    RegisterComponents,
    AcceuilComponent,
    CarComponent,
    AdminComponent,
    HeaderComponents,
    NewCarComponent,
    NewClientComponent,
    GridComponent,
    ChartComponent,
    NewReservationComponent,
    ClasseComponent
    // DialogData
    
  ],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    },
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  entryComponents: [
    MyApp,
    UserComponents,
    RegisterComponents,
    CarComponent,
    AcceuilComponent,
    AdminComponent,
    HeaderComponents,
    NewCarComponent,
    NewClientComponent,
    GridComponent,
    ChartComponent,
    NewReservationComponent, 
    ClasseComponent
  ],
  bootstrap: [ MyApp, 
    // DialogData 
  ]
})
export class AppModule {
  

}