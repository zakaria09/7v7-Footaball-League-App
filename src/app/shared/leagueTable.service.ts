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

@Injectable()
export class LeagueTableService{
    WinningTeams = [];
    teamCollection = [];

    constructor(private db: AngularFirestore, 
                public teamService: TeamService) {}

    queryCollections(team) {
        return this.db.collection('matches', ref => 
                    ref.where('winner' , '==', team.teamName)
                    //.orderBy('teamName', 'desc')    
                ).snapshotChanges()
                .pipe(map(docArray => {
                    return docArray.map(doc => {
                      return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data(),
                      }
                    })
                  }))
    }

    getAllTeams() {
        this.check(this.teamCollection, this.WinningTeams)
        // return a list of teams with doc id
        return this.teamService.getAllTeams()
            .subscribe(teamsCollection => {
                this.teamCollection.push(...teamsCollection);
                teamsCollection.forEach(team => {
                return this.queryCollections(team)
                .subscribe( data => {
                    this.WinningTeams.push(...data);
                })
            });
            });
    }


    check(teams, matches) {
        console.log(teams, matches)
        // tried for loop but doesn't work
        // https://stackoverflow.com/questions/2722159/javascript-how-to-filter-object-array-based-on-attributes
        for(let i = 0; i < teams.length; i++) {
            return console.log(teams[i])
        }
    }

    updateWins(docId, winsTeam) {
        this.db.collection('teams').doc(docId).update({
                wins: winsTeam
            })
    }




}