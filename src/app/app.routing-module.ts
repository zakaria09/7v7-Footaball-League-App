import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';
import { LeagueTableComponent } from './league-table/league-table.component';
import { SettingsComponent } from './settings/settings.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';


const routes: Routes = [
    { path: 'matches', component: MatchesComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'leagueTable', component: LeagueTableComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'blog', component: PostListComponent },
    { path: 'blog/:id', component: PostDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}