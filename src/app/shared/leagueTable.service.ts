import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument
  } from '@angular/fire/firestore';
import { Injectable, OnDestroy } from '@angular/core';
import { TeamService } from './team.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription' ;

@Injectable()
export class LeagueTableService implements OnDestroy{

  winsAndDrawsChanged = new Subject<any>();
  pointsSub: Subscription;

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

  incrementWins(docId, obj) {
    this.db.collection('teams').doc(docId).update({
        wins: ++obj.wins,
        played: ++obj.played
      })
}

  incrementDraws(docId, obj) {
    this.db.collection('teams').doc(docId).update({
        draws: ++obj.draws,
        played: ++obj.played
      })
}

updateReset(teamObj) {
  this.db.collection('teams').doc(teamObj.id).update({
      wins: 0,
      draws: 0,
      played: 0,
      points: 0
    })
}


  // editTable(teamObj) {
  //   this.db.collection('teams').doc(teamObj.id).update({
  //     wins: 0,
  //     draws: 0,
  //     played: 0,
  //     points: 0
  //   })
  // }


  resetLeagueTable() {
    this.teamService
      .getAllTeams()
      .subscribe(teams => {
        teams.forEach(team => {
          this.updateReset(team);
        });
      })
  }



  //causes memory leak!
  // updatePoints() {
  //   this.pointsSub = this.teamService
  //   .getAllTeams()
  //   .subscribe(teams => {
  //     teams.forEach(team => {
  //       this.tablePoints(team);
  //     });
  //   })
  // }

  // https://stackoverflow.com/questions/52157500/add-firestore-document-to-observable
  // use valuechanges to listen to changes in wins and draws
  // assign valuechanges to points sub Subscription
  // have teamObj as a param

  // !!!
  tablePoints(teamObj) {
      // console.log('hello')
      // console.log(teamObj[i].draws)
      if(teamObj.draws) {
        this.db.collection('teams').doc(teamObj.id).update({
          points: (teamObj.draws + 1)
        })
      }
      if(teamObj.wins) {
        this.db.collection('teams').doc(teamObj.id).update({
          points: (teamObj.wins * 3)
        })
      }
  }

  ngOnDestroy() {
    this.pointsSub.unsubscribe();
  }
}