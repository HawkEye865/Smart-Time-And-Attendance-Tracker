import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EntriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-entries',
  templateUrl: 'entries.html',
})
export class EntriesPage {

  date
  days
  data

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date = navParams.get('date')
    this.days = navParams.get('days')
    this.data = navParams.get('data')
    console.log(this.data)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EntriesPage');
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
