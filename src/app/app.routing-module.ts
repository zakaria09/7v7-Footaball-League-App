import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';
import { LeagueTableComponent } from './league-table/league-table.component';
import { SettingsComponent } from './settings/settings.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGaurd } from './auth/auth.gaurd'
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
    { path: 'matches', component: MatchesComponent, data: { animation: 'isRight' }, canActivate: [AuthGaurd]},
    { path: 'teams', component: TeamsComponent, data: { animation: 'isLeft' }, canActivate: [AuthGaurd]},
    { path: 'leagueTable', component: LeagueTableComponent, data: { animation: 'isRight' }},
    { path: 'settings', component: SettingsComponent, data: { animation: 'isLeft' }},
    { path: 'blog', component: PostListComponent, data: { animation: 'isLeft' }},
    { path: 'blog/:id', component: PostDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: UserProfileComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGaurd]
})

export class AppRoutingModule {}