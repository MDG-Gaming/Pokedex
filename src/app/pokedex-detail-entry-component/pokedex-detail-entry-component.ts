import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokedexService } from '../Services/Pokedex.service';
import { PokemonDetail } from '../Models/Pokemon';

@Component({
  selector: 'app-pokedex-detail-entry-component',
  imports: [],
  templateUrl: './pokedex-detail-entry-component.html',
  styleUrl: './pokedex-detail-entry-component.scss',
})
export class PokedexDetailEntryComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pokedexService = inject(PokedexService);
  private readonly router = inject(Router);
  pokemonDetail: PokemonDetail = {} as PokemonDetail;
  pokemonId: number = 0;

  ngOnInit(): void {
    this.pokemonId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPokemonDetail();
  }

  private loadPokemonDetail() {
    this.pokedexService.getPokemonDetail(this.pokemonId).subscribe(detail => {
      this.pokemonDetail = detail;
    });
  }

  nextPokemon() {
    if (JSON.parse(localStorage.getItem("pokemonList") ?? '[]').length > this.pokemonId) {
      this.pokemonId++;
      this.router.navigate(['/pokemon', this.pokemonId]);
      this.loadPokemonDetail();
    }
    else {
      this.pokemonId = 1;
      this.router.navigate(['/pokemon', this.pokemonId]);
      this.loadPokemonDetail();
    }
  }

  lastPokemon() {
    if (this.pokemonId > 1) {
      this.pokemonId--;
      this.router.navigate(['/pokemon', this.pokemonId]);
      this.loadPokemonDetail();
    }
    else {
      this.pokemonId = JSON.parse(localStorage.getItem("pokemonList") ?? '[]').length;
      this.router.navigate(['/pokemon', this.pokemonId]);
      this.loadPokemonDetail();
    }
  }
}
