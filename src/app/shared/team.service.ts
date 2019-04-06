import {
    AngularFirestore
  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TeamService {
    teamsAdded = new Subject<any>();
    teams: Observable<any>;

    constructor(private db: AngularFirestore) {}

    createTeam(team) {
        return this.db.collection('teams').add({
            teamName: team.teamName,
            wins: 0,
            draws: 0,
            played: 0,
            points: 0,
            homeOrAway: team.homeOrAway
        });
    }

    fetchTeams() {
        this.teams = this.db
                        .collection('teams')
                        .snapshotChanges();
        return this.teams;
    }

    getAllTeams() {
        return this.fetchTeams()
        .pipe(map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data(),
              }
            })
          }))
    }
}