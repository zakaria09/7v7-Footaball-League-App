import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatchesService } from '../matches.service';

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  matches: Observable<any>;

  constructor(private games: MatchesService) { }

  ngOnInit() {
    this.matches = this.games.fetchMatches();
  }

}
