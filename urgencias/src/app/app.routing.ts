import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

// sections name
const css = 'CSS';
const formControls = 'Form Controls';
const layout = 'Layout';
const loading = 'Loading';
const indicator = 'Indicators';
const service = 'Services';

// tslint:disable:max-line-length
export const ROUTES: Routes = [
  // home route
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'content', loadChildren: './content/content.module#ContentModule',data: { icon: 'language-css3', text: 'Materialize CSS Class', section: css } },


  // redirect to home when route does not exists (must be last route)
  { path: '**', redirectTo: 'home' },
];