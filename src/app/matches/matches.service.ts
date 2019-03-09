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

@Injectable() // Whats the point??
export class MatchesService {
    matchesAdded = new Subject<Matches[]>();
    matches: Observable<any>;
    private currentFixtures: Matches[] = [];

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

    deleteFixtures(key) {
        return this.db.collection('matches').doc(key).delete();
    }
}