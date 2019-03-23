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
    Winners = [];
    teams = [];

    constructor(private db: AngularFirestore, 
                public teamService: TeamService) {}


    getWinners() {
        this.db.collection('matches', ref => 
            ref.where('draw', '==', false))
                .valueChanges()
                .subscribe(data => {
                    data.forEach(match => {
                        this.Winners.push(match['winner'])
                    })
                })
    }

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

    getTeams() {
        this.fetchTeams('teams')
            .subscribe(data => {
                console.log('teams',data)
                data.forEach(team => {
                    // get and push id
                    // get and push wins
                    this.teams.push({
                        'name' :team['teamName'],
                        'id': team['id'],
                        'wins': team['wins']
                    })
                })
            })
    }

    checkWinners(teams: Array<any>, winner: Array<any>) {
        // gets the amount of times a team won by comparing
        setTimeout(() => {
            winner.forEach((winner) => teams.forEach( (team) => {
                if(team.name == winner) {
                    console.log('won', team.name)
                    //team.wins
                    team.wins++;
                    this.updateWins(team.id, team.wins)
                }
            }))
        }, 2000)
    }

    loopThroughTeamsAndWinners() {
        
    }

    updateWins(docId, winsTeam) {
        this.db.collection('teams').doc(docId).update({
                wins: winsTeam
            })
    }




}