import {
    AngularFirestore  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Matches } from './matches';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { TeamService } from '../shared/team.service';

@Injectable() // to inject
export class MatchesService {
    matchesAdded = new Subject<Matches[]>();
    matches: Observable<any>;
    
    //scores: Observable<any>;

    constructor(private db: AngularFirestore,
                private datePipe: DatePipe,
                private teamservice: TeamService) {}


    fetchMatches() {
        this.matches = this.db.collection('matches').snapshotChanges();
        return this.matches;
    }

    createMatches(value) {
        return this.db.collection('matches').add(value);
    }

/*     winningTeams(team2goals: number) {	    
        console.log('team2',team2goals);	        
        return this.matches
        return this.db	
        .collection('matches', ref => 	
            ref.where('firstTeamGoals', '>', team2goals))	
            .valueChanges()	
            .subscribe(res => {	
                console.log('win',res)	
            )} */

    getAllMatches() {
        // change to this.fetchMatches()
        return this.matches
        .pipe(map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                ...doc.payload.doc.data(),
              }
            })
          }))
    }

    updateDocuments(docId, winningTeam, isDraw: Boolean) {
        this.db.collection('matches').doc(docId).update({
            winner: winningTeam,
            draw: isDraw
          })
    }

    updateTableWins(docId, wins) {
        this.db.collection('teams').doc(docId).update({
            wins: ++wins,
          })
    }

    updateTableDraws(obj) {
        this.db.collection('teams').doc(obj.firstTeamId).update({
            draws: ++obj.firstTeamDraws,
          })
          this.db.collection('teams').doc(obj.secondTeamId).update({
            draws: ++obj.secondTeamDraws,
          })
    }

    updateWinsAndDraws() {
        // only update table in fixture
        // NOT in scores!
        this.getAllMatches()
            .subscribe(res => {
                res.forEach(team => {
                    if(team.firstTeamGoals > team.secondTeamGoals) {
                        this.updateTableWins(team.firstTeamId, team.firstTeamWins);
                    } else if(team.firstTeamGoals < team.secondTeamGoals) {
                        this.updateTableWins(team.secondTeamId, team.secondTeamWins);
                    } else if(team.draw) {
                        this.updateTableDraws(team);
                    } else {
                        console.log('No winners or draws yet!');
                    }
                })
            })
    }

    addWinners() {
        // put the uppdate in a seperate methods
        this.getAllMatches()
            .subscribe(res => {
              res.forEach(game => {
                  console.log('update', res);
                  // delete the this.updateTableWins(game.firstTeamId) 
                  if(game.firstTeamGoals > game.secondTeamGoals) {
                      this.updateDocuments(game.id, game.firstTeam, false);
                  } else if(game.firstTeamGoals < game.secondTeamGoals) {
                      this.updateDocuments(game.id, game.secondTeam, false);
                  } else if(game.firstTeamGoals == null || game.secondTeamGoals == null) {
                    this.updateDocuments(game.id, null, null);
                  } else {
                      this.updateDocuments(game.id, null, true);
                  }
              })
          });
    }

    addScores(value, id) {
        return this.db.collection('matches').doc(id).update({
            firstTeamGoals: value.firstTeamGoals,
            secondTeamGoals: value.secondTeamGoals
        });
    }

    deleteMatch(key) {
        // add yes or no option
        alert('Are You Sure Yoou Want to Delete This?');
        return this.db.collection('matches').doc(key).delete();
    }
}