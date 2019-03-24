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





}