import { Routes } from '@angular/router';
import {AuthorComponent} from "./author/author.component";
import {TeamComponent} from "./team/team.component";


export const ROUTES: Routes = [
    { path: 'author', component: AuthorComponent},
    { path: 'team', component: TeamComponent},
];
