import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireUploadTask, AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements OnInit {

  task: AngularFireUploadTask;

  uploadPercentage: Observable<number>;

  imgForm: FormGroup;
  downloadURL: Observable<any>;
  imageURL: string;

  constructor(private storage: AngularFireStorage,
              @Inject(MAT_DIALOG_DATA) public passedData: any,
              public dialogRef: MatDialogRef<ProfileImageComponent>,
              private authservice: AuthService,
              private notify: NotificationService) { }

  ngOnInit() {
    this.imgForm = new FormGroup({
      'image': new FormControl(null, Validators.required),
    }); 
  }

  startUpload(event) {
    const file = event.item(0);
    if(file.type.split('/')[0] !== 'image') {
      alert('Only images please!');
    }
    // storage path 
    const path = `test/${new Date().getTime()}_${file.name}`;
    // upload the path and the file
    this.task = this.storage.upload(path, file);
    // make a reference to the file path
    let ref = this.storage.ref(path);
    // assign the uploadPercentage to the percentageChanges
    this.uploadPercentage = this.task.percentageChanges();
    // get url and subscribe
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.downloadURL = ref.getDownloadURL();
        this.downloadURL.subscribe(url => {
          this.imageURL = url;
        });
      }
      )
    ).subscribe();
  }

  onSubmit() {
    if(!this.imgForm.invalid && this.passedData.userId) 
    {
      this.authservice.updateProfileImage(this.passedData.userId, this.imageURL);
      this.dialogRef.close();
      this.notify.successMessage('You\'ve Successfully Updated Your Profile Image!');
    } else {
      this.notify.warnMessage('oooops! There was an error please close and try again.');
    }
  }

}
