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

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { MatchesService } from './matches/matches.service'
import { DatePipe } from '@angular/common';
import { ScoresModalComponent } from './matches/scores-modal/scores-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { ThemeService } from './shared/theme.service'
import { CreateTeamComponent } from './teams/create-team/create-team.component';
import { ViewTeamsComponent } from './teams/view-teams/view-teams.component';
import { TeamService } from './shared/team.service';
import { LeagueTableService } from './shared/leagueTable.service';
import { PostsComponent } from './posts/posts.component';
import { PostDashboardComponent } from './posts/post-dashboard/post-dashboard.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostService } from './posts/post.service';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import 'hammerjs';
import { EditTableComponent } from './league-table/edit-table/edit-table.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
    SettingsComponent,
    CreateTeamComponent,
    ViewTeamsComponent,
    PostsComponent,
    PostDashboardComponent,
    PostDetailsComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    EditTableComponent,
    UserProfileComponent
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
    AngularFireAuthModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    MatchesService, 
    DatePipe,
    ThemeService,
    TeamService,
    LeagueTableService,
    PostService,
  ],
  entryComponents: [
    ScoresModalComponent,
    EditTableComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
