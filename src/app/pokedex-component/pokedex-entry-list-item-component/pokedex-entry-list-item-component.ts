import { Component, input } from '@angular/core';
import { PokemonListItem } from '../../Models/PokemonListItem';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-pokedex-entry-list-item-component',
  imports: [RouterLink],
  templateUrl: './pokedex-entry-list-item-component.html',
  styleUrl: './pokedex-entry-list-item-component.scss',
})
export class PokedexEntryListItemComponent {
  pokemon = input.required<PokemonListItem>();
}
