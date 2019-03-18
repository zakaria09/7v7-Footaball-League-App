import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
  } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Matches } from './matches';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable() // to inject
export class MatchesService {
    matchesAdded = new Subject<Matches[]>();
    matches: Observable<any>;
    
    //scores: Observable<any>;

    constructor(private db: AngularFirestore, private datePipe: DatePipe) {}


    fetchMatches() {
        this.matches = this.db.collection('matches').snapshotChanges();
        return this.matches;
    }

    createMatches(value) {
        return this.db.collection('matches').add({
            firstTeam: value.firstTeam,
            secondTeam: value.secondTeam,
            date: this.datePipe.transform(value.date, 'yyyy-MM-dd'),
            time: value.time
        });
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

    addWinners() {
        // put the uppdate in a seperate methods
        this.getAllMatches()
            .subscribe(res => {
              res.forEach(game => {
                  console.log('update');
                  if(game.firstTeamGoals > game.secondTeamGoals) {
                      this.updateDocuments(game.id, game.firstTeam, false);
                  } else if(game.firstTeamGoals < game.secondTeamGoals) {
                      this.updateDocuments(game.id, game.secondTeam, false);
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