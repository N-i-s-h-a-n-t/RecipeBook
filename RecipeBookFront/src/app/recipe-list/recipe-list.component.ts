import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../core/model/recipe.model';
import { RecipesService } from '../core/services/recipes.service';
import { Subject, Subscribable, Subscription, catchError, from, map, of, retry, retryWhen, takeUntil, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes!: Recipe[];
  subscription!: Subscription;
  destroy$= new Subject<void>();
  numbers = [];
  //  chapter 4 ---------- approach 3
  recipes$ = this.service.recipes$;

  constructor(private service: RecipesService) {}

  ngOnInit(): void {
    // --------------------- chapter 4 approach 1
    // this.subscription = this.service.getRecipes().subscribe((data) => {
    //   this.recipes = data;
    // })

    //  --------------- chater 4 approach 2
    this.service.getRecipes().pipe(
      takeUntil(this.destroy$)).subscribe((result) => {
        this.recipes = result;
        console.log(this.recipes);
      });

      // this.practice();

  }

  streamNumber$ = from(['1', '2', '3', '2', 'Hello', '1']);

  practice() {
    this.streamNumber$.pipe(
      map((val) => {
        if(isNaN(val as any)) {
          throw new Error('This is not a number');
        }
        return parseInt(val);
      }),
      // retry(2),
      // catchError((error) => {
      //   console.log('Error has occured');
      //   return throwError(() => error);
      // })
      // retryWhen((error) => {
      //   return error.pipe(
      //     tap(() => console.log('Retrying...'))
      //   )
      // })
    ).subscribe(
      {
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => console.log('complete'), 
    }
  )
  }

  ngOnDestroy(): void {
    // chapter 4 --------- approach 1
    // this.subscription.unsubscribe()

    // chapter 4 --------------- approach 2
    this.destroy$.next();
    this.destroy$.complete();
  }

}
