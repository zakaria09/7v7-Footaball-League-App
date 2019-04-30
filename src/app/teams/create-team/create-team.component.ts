import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TeamService } from 'src/app/shared/team.service';
import { Choices } from './Choices';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  teamForm: FormGroup;

  constructor(private teamservice: TeamService,
              private notify: NotificationService)  { }

  ngOnInit() {
    this.teamForm = new FormGroup({
      'teamName': new FormControl(null, Validators.required),
    }); 
  }

  onSubmit(teamForm) {
    if(!this.teamForm.invalid) {
      console.log(teamForm)
      this.teamservice.createTeam(teamForm);
      this.notify.successMessage('Successfully added ' + teamForm.teamName + ' to the league!');
    }
    this.teamForm.reset();
  }
}
