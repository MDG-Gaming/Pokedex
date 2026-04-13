import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { PokemonListItem } from "../Models/PokemonListItem";
import { PokemonListItemResponse } from "../Models/PokemonListItemResponse";
import { map, Observable, of } from "rxjs";
import { PokemonDetail } from "../Models/Pokemon";

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private apiUrl = 'https://pokeapi.co/api/v2';
  private http = inject(HttpClient);

  public getPokemonList() : Observable<PokemonListItem[]> {
    if (localStorage.getItem('pokemonList')) {
      return of(JSON.parse(localStorage.getItem('pokemonList')!));
    }
    else {
      return this.http.get<any>(`${this.apiUrl}/pokemon?limit=100000&offset=0.`).pipe(map(response => {
        let result = this.convertToStandardListItem(response.results);
        localStorage.setItem('pokemonList', JSON.stringify(result));
        return result;
      }));
    }
  }

  private  convertToStandardListItem(raw: PokemonListItemResponse[]) : PokemonListItem[]
  {
    const cleaned = this.cleanPokemonList(raw);
    const converted: PokemonListItem[] = [];
    for(let i = 0; i < cleaned.length; i++) {
      if (!cleaned[i]) continue;
      const convertedItem : PokemonListItem = {
        id: i+1,
        name: cleaned[i].name ?? '',
        pictureUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`,
        detailUrl: cleaned[i].url ?? ''
      }
      converted.push(convertedItem);
    }

    return converted;
  }

  private cleanPokemonList(unfiltered: PokemonListItemResponse[]) : PokemonListItemResponse[] {
    const filtered: PokemonListItemResponse[] = [];
    unfiltered.forEach(item => {
      if (item) {
        filtered.push(item);
      }
    });
    return filtered;
  }

  public getPokemonDetail(id: number) : Observable<PokemonDetail> {
    if (localStorage.getItem(`pokemonDetail-${id}`)) {
      return of(JSON.parse(localStorage.getItem(`pokemonDetail-${id}`)!));
    }
    else {
      return this.http.get<any>(`${this.apiUrl}/pokemon/${id}`).pipe(map(response => {
        const clean = this.getCleanPokemonDetail(response);
        localStorage.setItem(`pokemonDetail-${id}`, JSON.stringify(clean));
        return clean;
      }));
    }
  }

  private getCleanPokemonDetail(raw: any) : PokemonDetail {
    const clean: PokemonDetail = {
      id: raw.id,
      name: raw.name,
      sprite: raw.sprites.other['official-artwork'].front_default,
      types: raw.types,
      abilities: raw.abilities,
      stats: raw.stats
    }
    return clean;
  }
}
