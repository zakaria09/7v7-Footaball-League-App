import {
    AngularFirestore
  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class TeamService {
    teamsAdded = new Subject<any>();

    constructor(private db: AngularFirestore) {}

    createTeam(team) {
        return this.db.collection('teams').add({
            teamName: team.teamName
        });
    }
}