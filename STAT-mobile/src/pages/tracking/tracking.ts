import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';
import { AddEntryPage } from '../add-entry/add-entry';
import { EntriesPage } from '../entries/entries';

/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html'
})
export class TrackingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public user : User, public modalCtrl: ModalController) {
  }

  entries : Object[]
  week : Object[] = []
  date : Date = new Date()
  date1 : Date = new Date()
  date2 : Date = new Date()
  date3 : Date = new Date()
  date4 : Date = new Date()
  date5 : Date = new Date()

  activityVal : number = 0
  entriesVal : number = 0
  tasksVal : any = []
  projectsVal : any = []

  // edit entry
  editing : boolean = false
  editingTime : any = 0

  addEntry() {
    this.navCtrl.push(AddEntryPage)
  }

  ionViewDidLoad() {
    this.date1.setDate(this.date.getDate()-1)
    this.date2.setDate(this.date.getDate()-2)
    this.date3.setDate(this.date.getDate()-3)
    this.date4.setDate(this.date.getDate()-4)
    this.date5.setDate(this.date.getDate()-5)

    // get entries
    this.getEntries(this.formatDate(this.date))
    this.getEntries(this.formatDate(this.date1))
    this.getEntries(this.formatDate(this.date2))
    this.getEntries(this.formatDate(this.date3))
    this.getEntries(this.formatDate(this.date4))
    this.getEntries(this.formatDate(this.date5))
  }

    // get tracking entries
    getEntries(date : String) {
      this.week['today'] = []
      this.week['yesterday'] = []
      this.week['2days'] = []
      this.week['3days'] = []
      this.week['4days'] = []
      this.week['5days'] = []

      this.user.getTimeEntries(date, localStorage.getItem('token')).subscribe((data) => {
        console.log(data)
  
        // values on dashboard
        if (this.editing == false) {
          this.entriesVal += data['timeEntries'].length
        } else {
          this.activityVal -= - this.editingTime
        }
  
        data['timeEntries'].forEach(element => {
          if (element.taskID != null && !this.tasksVal.includes(element.taskID)) {
            this.tasksVal.push(element.taskID)
          }

          if (element.projectID != null && !this.projectsVal.includes(element.projectID)) {
            this.projectsVal.push(element.projectID)
          }
  
          if (this.editing == false)
            this.activityVal += element.activeTime
        });
  
        if (date == this.formatDate(this.date))
          this.week['today'] = data['timeEntries'].sort((a : any ,b : any) =>
            b.endTime - a.endTime
        );
        if (date == this.formatDate(this.date1))
          this.week['yesterday'] = data['timeEntries'].sort((a : any ,b : any) =>
          b.endTime - a.endTime
        );
        if (date == this.formatDate(this.date2))
          this.week['2days'] = data['timeEntries'].sort((a : any ,b : any) =>
          b.endTime - a.endTime
        );
        if (date == this.formatDate(this.date3))
          this.week['3days'] = data['timeEntries'].sort((a : any ,b : any) =>
          b.endTime - a.endTime
        );
        if (date == this.formatDate(this.date4))
          this.week['4days'] = data['timeEntries'].sort((a : any ,b : any) =>
          b.endTime - a.endTime
        );
        if (date == this.formatDate(this.date5))
          this.week['5days'] = data['timeEntries'].sort((a : any ,b : any) =>
          b.endTime - a.endTime
        );

        console.log(this.week)
      },
      error => {
        //console.log(error);
        let errorCode = error['status'];
        if (errorCode == '403')
        {
          //console.log("Your session has expired. Please sign in again.");
          // kick user out
          //this.headerService.kickOut();
        }
      });
    }

  showEntries(event, date, days, data) {
    this.navCtrl.push(EntriesPage, {
      'date': date,
      'days': days,
      'data': data
    })
  }

    // format date
  formatDate(date : Date) {
    var y = date.getFullYear().toString();
    var m = (date.getMonth()+1).toString();
    var d = date.getDate().toString();

    let toReturn = new String(y + '/');

    if (m.length == 1)
      toReturn += ('0' + m + '/')
    else
      toReturn += (m + '/')

    if (d.length == 1)
      toReturn += ('0' + d)
    else
      toReturn += (d)

    return toReturn
  }

  // get correct date format
  formatWeekDate(d : Date) {
    const options = {
      month:"long",
      day:"2-digit"
    }
    return new Date(d).toLocaleDateString('en-US', options)
  }

  // get time spent
  getTime(mins : number) {
    var hours = Math.floor(mins / 60)
    var rem = mins % 60
    return (hours + 'h ' + rem + 'm')
  }

}

