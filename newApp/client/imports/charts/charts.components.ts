import { Component, NgZone,  Input,  Output } from '@angular/core';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Livres, Clients } from '../app.components';
import styles from "./style.css";
import template from './charts.html';
@Component({
  selector: 'Chart',
  template,
  styles
})
export class ChartComponent {   
        // Doughnut
        public doughnutChartLabels:string[] = ['Livres Disponible', 'Livres in repair', 'Livres Reserved' ];
        public doughnutChartData:number[] = [350, 50, 250];
        public doughnutChartType:string = 'doughnut';
        private doughnutChartColors: any[] = [{ 
            backgroundColor: ["#b8436d", "#a4c73c", "#00d9f9"],
            borderColor: "#2c3e50"
        }];
        private colorBorder: any[] = [{
            backgroundColor: ["#b8436d", "#a4c73c", "#00d9f9"],
            borderColor: "#2c3e50" //rgba(0,0,0,0)
        }];
        // events
        public chartClicked(e:any):void {
          console.log(e);
        }

        public lineChartData:Array<any> = [
            { data :[10, 29, 40, 41, 36, 25, 50], label: 'Customers'},
            { data :[28, 18, 10, 19, 10, 16, 8], label: 'Livres'},
            { data :[3, 5, 19, 9, 20, 18, 40]   , label: 'Reservation'}
        ];
        public lineChartOptions:any = {
            responsive: true,
            // maintainAspectRatio: false,
          };
        public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        public lineChartType:string = 'line';
        public pieChartType:string = 'pie';
        
        // Pie
        public pieChartLabels:string[] = ['Inactive Customers','Active Customers'];
        public pieChartData:number[] = [50, 20];
        
        public randomizeType():void {
            this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
            this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
        }
        
        public chartHovered(e:any):void {
        console.log(e);
        }
}