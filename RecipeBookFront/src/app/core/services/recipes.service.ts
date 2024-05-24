import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/enviornments/enviornment';
import { Observable, catchError, delayWhen, of, retry, retryWhen, tap, throwError, timer } from 'rxjs';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  // retrive data as stream
  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`)
  .pipe(
    catchError((error) => {
      console.log(`Error has ocurred`);
      return of([]);
    })
  )

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
    // return of();
  }

}
