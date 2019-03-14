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

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { MatchesService } from './matches/matches.service'
import { DatePipe } from '@angular/common';
import { ScoresModalComponent } from './matches/scores-modal/scores-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { ThemeService } from './theme.service'

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
    ScoresModalComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule, 
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    MatchesService, 
    DatePipe,
    ThemeService
  ],
  entryComponents: [ScoresModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
