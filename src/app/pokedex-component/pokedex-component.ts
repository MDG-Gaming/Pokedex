import { Component, DOCUMENT, HostListener, inject, OnInit } from '@angular/core';
import { PokemonListItem } from '../Models/PokemonListItem';
import { PokedexEntryListItemComponent } from './pokedex-entry-list-item-component/pokedex-entry-list-item-component';
import { PokedexService } from '../Services/Pokedex.service';

@Component({
  selector: 'app-pokedex-component',
  imports: [PokedexEntryListItemComponent],
  templateUrl: './pokedex-component.html',
  styleUrl: './pokedex-component.scss',
})
export class PokedexComponent implements OnInit {
  private pokedexService = inject(PokedexService);

  private pokedex: PokemonListItem[] = [];
  private pageIndex = 0;
  private limit = 60;

  pokedexPage: PokemonListItem[] = [];

  ngOnInit() {
    this.pokedexService.getPokemonList().subscribe((response) => {
      this.pokedex = response;
      this.changePage();
    });
  }

  private loadNextPage() {
    if ((this.pageIndex + 1) * this.limit < this.pokedex.length) {
      this.pageIndex++;
      this.changePage();
    }
  }

  private changePage() {
    this.pokedexPage = this.pokedex.slice(0, this.limit * (this.pageIndex + 1));
  }

  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (Math.ceil(element.scrollHeight - element.scrollTop) <= element.clientHeight + 1) {
      this.loadNextPage();
    }
  }
}
