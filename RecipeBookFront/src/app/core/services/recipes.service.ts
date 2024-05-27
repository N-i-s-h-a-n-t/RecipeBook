import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../model/recipe.model';
import { environment } from 'src/enviornments/enviornment';
import { BehaviorSubject, Observable, catchError, delayWhen, of, retry, retryWhen, tap, throwError, timer } from 'rxjs';
const BASE_PATH = environment.basePath;

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private filterRecipeSubject = new BehaviorSubject<Recipe>({title: ''});

  //readonly stream
  filterRecipesAction$ = this.filterRecipeSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  // retrive data as stream
  recipes$ = this.http.get<Recipe[]>(`${BASE_PATH}/recipes`)
  .pipe(
    catchError((error) => {
      console.log(`Error has ocurred`);
      return of([]);
    })
  )

  updateFilter(criteria: any) {
    this.filterRecipeSubject.next(criteria);
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${BASE_PATH}/recipes`);
    // return of();
  }
}
