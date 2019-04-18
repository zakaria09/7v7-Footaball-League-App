import {
    AngularFirestore  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Matches } from './matches';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { TeamService } from '../shared/team.service';
import { NotificationService } from '../shared/notification.service';

@Injectable() // to inject
export class MatchesService {
    matchesAdded = new Subject<Matches[]>();
    matches: Observable<any>;
    
    //scores: Observable<any>;

    constructor(private db: AngularFirestore,
                private datePipe: DatePipe,
                private teamservice: TeamService,
                private notify: NotificationService) {}


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

    firstTeamWins(obj) {
        // just updating teams wins and not the team wins in the game
        this.db.collection('teams').doc(obj.firstTeamId).update({
            wins: ++obj.firstTeamWins,
          })
          console.warn(obj.firstTeamWins)
        this.UpdateFirstTeamTablePoints(obj);
    }

    secondTeamWins(obj) {
        // just updating teams wins and not the team wins in the game
        this.db.collection('teams').doc(obj.secondTeamId).update({
            wins: ++obj.secondTeamWins,
          })
          console.warn(obj.secondTeamWins)
        this.UpdateSecondTeamTablePoints(obj);
    }

    updateTableFirstTeamDraws(obj) {
        this.db.collection('teams').doc(obj.secondTeamId).update({
            draws: ++obj.secondTeamDraws,
        })
    }
    
    updateTableSecondTeamDraws(obj) {
        console.log('a draw has occured')
        this.db.collection('teams').doc(obj.firstTeamId).update({
            draws: ++obj.firstTeamDraws,
          })
    }

    updateFirstTeamPlayed(obj) {
        this.db.collection('teams').doc(obj.firstTeamId).update({
            played: ++obj.firstTeamPlayed,
          })
        //this.tablePoints(obj);
        
    }

    updateSeccondTeamPlayed(obj) {
        this.db.collection('teams').doc(obj.secondTeamId).update({
            played: ++obj.secondTeamPlayed,
        })
        console.log('second Draws',obj.secondTeamPlayed);
        //this.tablePoints(obj);
        this.UpdateFirstTeamTablePoints(obj);
    }

    UpdateFirstTeamTablePoints(teamObj) {
        // for --> firstTeam
        if(teamObj.firstTeamDraws || teamObj.firstTeamWins) {
          this.db.collection('teams').doc(teamObj.firstTeamId).update({
            points: (teamObj.firstTeamDraws * 1) + (teamObj.firstTeamWins * 3)
          })
        }
    }

    UpdateSecondTeamTablePoints(teamObj) {
        //for --> secondTeam
        if(teamObj.secondTeamDraws || teamObj.secondTeamWins) {
          this.db.collection('teams').doc(teamObj.secondTeamId).update({
            points: (teamObj.secondTeamDraws * 1) + (teamObj.secondTeamWins * 3)
          })
        }
    }

    updateWinsAndDraws() {
        // only update table in fixture
        // NOT in scores!
        this.getAllMatches()
            .subscribe(res => {
                res.forEach(team => {
                    console.log('wns and draws department')
                    if(team.firstTeamGoals > team.secondTeamGoals) {
                        this.firstTeamWins(team);
                        this.updateFirstTeamPlayed(team);
                        this.updateSeccondTeamPlayed(team);
                    } else if(team.firstTeamGoals < team.secondTeamGoals) {
                        this.secondTeamWins(team);
                        this.updateFirstTeamPlayed(team);
                        this.updateSeccondTeamPlayed(team);
                    } else if(team.draw) {
                        this.updateTableFirstTeamDraws(team);
                        this.updateTableSecondTeamDraws(team);
                        this.updateFirstTeamPlayed(team);
                        this.updateSeccondTeamPlayed(team);
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
        this.notify.warnMessage('Match has been deleted!');
        return this.db.collection('matches').doc(key).delete();
    }
}