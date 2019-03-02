import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateFixturesComponent } from './matches/create-fixtures/create-fixtures.component';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { AppRoutingModule } from './app.routing-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatchesComponent } from './matches/matches.component';
import { FixturesComponent } from './matches/fixtures/fixtures.component';
import { ScoresComponent } from './matches/scores/scores.component';
import { TeamsComponent } from './teams/teams.component';
import { LeagueTableComponent } from './league-table/league-table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    CreateFixturesComponent,
    NavComponent,
    MatchesComponent,
    FixturesComponent,
    ScoresComponent,
    TeamsComponent,
    LeagueTableComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
