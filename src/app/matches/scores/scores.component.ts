import { Component, OnInit } from '@angular/core';
import { MatchesService } from '../matches.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Matches } from '../matches';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {
  scores: Observable<Matches[]>;

  constructor(private matches: MatchesService) { }

  ngOnInit() {
    console.log(this.matches.fetchMatches());
    this.scores = this.matches
    .fetchMatches()
    .pipe(map(docArray => {
      return docArray.map(doc => {
        return {
          id: doc.payload.doc.id,
          ...doc.payload.doc.data(),
        }
      })
    }))
    this.scores.subscribe(res => {
      console.log(res);
    })
  }

}
