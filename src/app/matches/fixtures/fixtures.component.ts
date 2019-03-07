import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchesService } from '../matches.service';
import 'rxjs/add/operator/map'
import { Matches } from '../matches';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  // Matches[]
  // because th objects returned are 
  // exactly in that format
  matches: Observable<Matches[]>;
  items: Array<any>;
  value;

  constructor(private games: MatchesService) { }

  ngOnInit() {
    console.log(this.games.fetchMatches());
    this.matches = this.games
      .fetchMatches()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          }
        })
      })

  }

  deleteFixture(item) {
    // add yes or no option
    alert('Are You Sure Yoou Want to Delete This Fixture?');
    this.games.deleteFixtures(item);
  }
}
