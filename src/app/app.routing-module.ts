import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatchesComponent } from './matches/matches.component';
import { TeamsComponent } from './teams/teams.component';
import { LeagueTableComponent } from './league-table/league-table.component';


const routes: Routes = [
    { path: 'matches', component: MatchesComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'leagueTable', component: LeagueTableComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule {}