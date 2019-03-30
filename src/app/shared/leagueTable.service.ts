import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
  } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { TeamService } from './team.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatchesService } from '../matches/matches.service';

@Injectable()
export class LeagueTableService{

    constructor(private db: AngularFirestore, 
                public teamService: TeamService) {}


    fetchTeams(data) {
        return this.db.collection(data)
            .snapshotChanges()
            .pipe(map(docArray => {
                return docArray.map(doc => {
                  return {
                    id: doc.payload.doc.id,
                    ...doc.payload.doc.data(),
                  }
                })
              }))
    }

    updateReset(teamObj) {
      this.db.collection('teams').doc(teamObj.id).update({
          wins: 0,
          draws: 0,
          played: 0,
          points: 0
        })
  }


    resetLeagueTable() {
      this.teamService
        .getAllTeams()
        .subscribe(teams => {
          teams.forEach(team => {
            this.updateReset(team);
          });
        })
    }
  
    tablePoints(teamObj) {
      if(teamObj.draws > 0) {
        this.db.collection('teams').doc(teamObj.id).update({
          points: (teamObj.draws * 1)
        })
      }
      if(teamObj.wins > 0) {
        this.db.collection('teams').doc(teamObj.id).update({
          points: (teamObj.wins * 3)
        })
      }
    }

    updatePoints() {
      this.teamService
      .getAllTeams()
      .subscribe(teams => {
        teams.forEach(team => {
          this.tablePoints(team);
        });
      })
    }
}