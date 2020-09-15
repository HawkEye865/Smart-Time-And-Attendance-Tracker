import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProjectDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {

  pro

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pro = navParams.get('project')
    console.log(this.pro)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectDetailsPage');
  }

  sortProTasks(tasks : any) {
    tasks.sort((a : any, b : any) => a.dueDate - b.dueDate || a.taskName - b.taskName)
    return tasks
  }

  // get correct date format
  formatDate(d : Date) {
    const options = {
      year: "numeric",
      month:"short",
      day:"2-digit"
    }
    return new Date(d).toLocaleDateString('en-US', options)
  }

}
