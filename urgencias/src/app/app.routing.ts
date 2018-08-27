import { Routes } from '@angular/router';

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
  { path: 'ejercicios', loadChildren: './questionaire/questionaire.module#QuestionaireModule',data: { icon: 'language-css3', text: 'Materialize CSS Class', section: css } },
  { path: 'credits', loadChildren: './credits/credits.module#CreditsModule',data: { icon: 'language-css3', text: 'Materialize CSS Class', section: css } },
  // redirect to home when route does not exists (must be last route)
  { path: '**', redirectTo: 'home' },
];
