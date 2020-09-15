import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the AddEntryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-entry',
  templateUrl: 'add-entry.html',
})
export class AddEntryPage {

  allProjects : any = []
  pSelected : any = 'Unspecified'
  tasks : any = []
  tSelected : any = ''
  startTime
  endTime
  date

  constructor(public navCtrl: NavController, public navParams: NavParams, public user : User) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEntryPage');
    this.getProAndTasks()
  }

  // get projects and tasks
  getProAndTasks()
  {
    this.user.getProjectsAndTasks(localStorage.getItem('token')).subscribe((data) => {
      console.log(data);
      this.allProjects = data['projects']

      this.allProjects = this.allProjects.sort((a : any, b : any) => Date.parse(a.dueDate) - Date.parse(b.dueDate) || a.projectName - b.projectName)

      //this.error = 'none'
    },
    error => {
      //console.log(error);
      //this.error = error.statusText
      let errorCode = error['status'];
      if (errorCode == '403')
      {
        //console.log("Your session has expired. Please sign in again.");
        // kick user out
        //this.headerService.kickOut();
      }
    });
  }

  test() {
    console.log('hi')
  }

  getTasks(tasks : any) {
    console.log(tasks)
    this.tasks = tasks
  }


}
