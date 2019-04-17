import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  accounts: Observable<any>;

  constructor(private Users: AuthService) { }

  ngOnInit() {
    this.accounts = this.Users.fetchUsers()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      }))
  }

}
