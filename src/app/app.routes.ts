import { Routes } from '@angular/router';
import { PokedexComponent } from './pokedex-component/pokedex-component';
import { PokedexDetailEntryComponent } from './pokedex-detail-entry-component/pokedex-detail-entry-component';

export const routes: Routes = [
  { path: '', redirectTo: 'pokedex', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'pokedex/:id', component: PokedexDetailEntryComponent}
];
