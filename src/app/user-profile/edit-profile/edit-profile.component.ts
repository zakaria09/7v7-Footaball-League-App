import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
              private notify: NotificationService,
              private authservice: AuthService,
              public dialogRef: MatDialogRef<EditProfileComponent>,) { }

  ngOnInit() {
    this.editForm = new FormGroup({
      'displayName': new FormControl('', [
        Validators.required
      ]),
    })
  }

  onSubmit(data) {
    if(!this.editForm.invalid) 
    {
      this.authservice.updateDisplayName(this.passedData.userId, data.displayName);
      this.notify.successMessage('Profile Successfully Updated!');
      this.editForm.reset();
      this.dialogRef.close();
    }
  }
}
