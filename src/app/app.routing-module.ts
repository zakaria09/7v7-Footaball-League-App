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
import { PostDashboardComponent } from './posts/post-dashboard/post-dashboard.component';
import { AdminGuard } from './auth/admin.guard';
import { CreateFixturesComponent } from './matches/create-fixtures/create-fixtures.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { CreateTeamComponent } from './teams/create-team/create-team.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', component: HomeComponent, data: { animation: 'isRight' }},
    { path: 'create-fixtures', component: CreateFixturesComponent, data: { animation: 'isLeft' }, canActivate: [AdminGuard]},
    { path: 'matches', component: MatchesComponent, data: { animation: 'isLeft' }, canActivate: [AuthGaurd]},
    { path: 'teams', component: TeamsComponent, data: { animation: 'isRight' }, canActivate: [AuthGaurd]},
    { path: 'create-teams', component: CreateTeamComponent, data: { animation: 'isLeft' }, canActivate: [AdminGuard]},
    { path: 'leagueTable', component: LeagueTableComponent, data: { animation: 'isRight' }, canActivate: [AuthGaurd]},
    { path: 'settings', component: SettingsComponent, data: { animation: 'isLeft' }, canActivate: [AuthGaurd]},
    { path: 'blog', component: PostListComponent, data: { animation: 'isLeft' }},
    { path: 'blog/:id', component: PostDetailsComponent },
    { path: 'create-post', component: PostDashboardComponent , canActivate: [AuthGaurd]},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'manage-users', component: ManageUsersComponent, canActivate: [AdminGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGaurd]
})

export class AppRoutingModule {}