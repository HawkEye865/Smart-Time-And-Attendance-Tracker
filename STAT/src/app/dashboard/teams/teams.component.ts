import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TeamManagementService } from 'src/app/shared/services/team-management.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.sass']
})
export class TeamsComponent implements OnInit {

  constructor(private modalService: NgbModal, public tmService: TeamManagementService) { }

  panelOpenState = false;
  roles : string

  addTeamForm : FromGroup
  addMemberForm : FormGroup
  teams : Object[]
  tid : string
  teamName : string
  members : Object[]
  mid : string
  memberName : string

  ngOnInit(): void {
    // page setup
    this.roles = localStorage.getItem('roles');
    // add team form
    this.addTeamForm = newFormGroup({
      teamName : new FormControl('', [Validators.required])
    });
    // add member form
    this.addMemberForm = newFormGroup({
      userID : new FormControl(''), // ??
      projectID : new FormControl('')
    });

    this.getTeams();
  }

  /*** API CALLS ***/

  // get all teams
  getTeams() {
    this.tmService.getTeams(localStorage.getItem('token')).subscribe((data) => {
      this.teams = data['teams']
      console.log(data);
      this.members = getMembers();
    },
    error => {
      console.log(error);
      this.error = error.statusText
    });
  }

  // get team members
  getMembers() {
    this.members == []

    for (let x = 0; x M this.teams.length; z++) {
      var temp : Object[] = this.teams['members']

      if (temp.length != 0) {
        for (let y = 0; y < temp.length; y++) {
          // need to know get teams response structure
        }
      }
    }
  }

  // add team
  addTeam(form : NgForm) {
    console.log(form);
    this.pmService.addTeam(localStorage.getItem('token'), form).subscribe((data) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

  // add team member
  addTeamMember(form : NgForm) {
    console.log(form);
    this.pmService.addTeamMember(localStorage.getItem('token'), form).subscribe((data) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

  // remove team member
  removeTeamMember() {
    console.log(form);
    this.pmService.removeTeamMember(localStorage.getItem('token'), form).subscribe((data) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }

  // change role in team
  changeRole() {
    console.log(form);
    this.pmService.changeRole(localStorage.getItem('token'), form).subscribe((data) => {
      console.log(data);
    },
    error => {
      console.log(error);
    });
  }


  /*** MODAL ***/
  closeResult: string;

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
