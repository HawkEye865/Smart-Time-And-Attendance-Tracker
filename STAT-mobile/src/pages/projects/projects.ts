import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../providers';

/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private user : User) {
  }

  allProjects : Object[]
  projects : Object[]
  tasks : Object[] = []
  tasksNum : number
  tasksDone : number
  tasksDue : number
  loading : boolean = true
  slides : number = 0
  upcoming : Object[] = []

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectsPage');
    this.getProAndTasks()
  }

  // get projects and tasks
  getProAndTasks()
  {
    this.user.getProjectsAndTasks(localStorage.getItem('token')).subscribe((data) => {
      console.log(data);
      this.allProjects = data['projects']

      this.allProjects = this.allProjects.sort((a : any, b : any) => Date.parse(a.dueDate) - Date.parse(b.dueDate) || a.projectName - b.projectName)
      this.projects = this.allProjects.filter((x : any) => x['completed'] == false)
      this.getTasks()
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

  //get tasks
  getTasks() {
    this.tasks = []
    this.upcoming = []

    for (let i = 0; i < this.projects.length; i++) {
      this.projects[i]['dueDate'] = Date.parse(this.projects[i]['dueDate'])
      var temp : Object[] = this.projects[i]['tasks']

      // if there are no tasks
      if (temp.length != 0) {
        for (let j = 0; j < temp.length; j++) {
          temp[j]['projectID'] = this.projects[i]['ID']
          temp[j]['projectName'] = this.projects[i]['projectName']
          temp[j]['dueDate'] = Date.parse(temp[j]['dueDate'])
          this.tasks.push(temp[j])
        }
      }
    }

    // sort tasks according to due date
    this.tasks.sort((a : any, b : any) => a.dueDate - b.dueDate || a.taskName - b.taskName || a.taskName - b.taskName)
    console.log(this.tasks)

    // get week details
    var startDate = new Date()
    var endDate = new Date()
    endDate.setDate(startDate.getDate()+6)
    console.log(startDate)
    var weekTasks = this.tasks.filter((t : any) => t.dueDate > startDate && t.dueDate < endDate)
    console.log(weekTasks)
    this.tasksNum = weekTasks.length
    this.tasksDone = weekTasks.filter((t : any) => t.taskStatus == 'Completed').length
    this.tasksDue = this.tasksNum - this.tasksDone

    this.loading = false
    var taskSlides = this.tasks.length - this.tasks.filter((t : any) => t.taskStatus == 'Completed').length
    this.slides = Math.ceil(taskSlides / 4)


    // get upcoming tasks
    let tempTasks : Object[] = this.tasks.filter((t : any) => t.taskStatus != 'Completed')
    tempTasks.forEach((element : any) => {
      if (element.dueDate < startDate)
        element['overdue'] = true
    });

    while (tempTasks.length) {
      this.upcoming.push(tempTasks.splice(0,4))
    }
    console.log(this.upcoming)
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
