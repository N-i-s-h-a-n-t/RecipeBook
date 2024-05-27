import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../core/model/recipe.model';
import { RecipesService } from '../core/services/recipes.service';
import { BehaviorSubject, Observable, Subject, Subscribable, Subscription, catchError, combineLatest, delayWhen, from, map, of, retry, retryWhen, take, takeUntil, tap, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // recipes!: Recipe[];
  subscription!: Subscription;
  destroy$= new Subject<void>();
  numbers = [];
  //  chapter 4 ---------- approach 3
  recipes$ = this.service.recipes$;
  filterRecipeAction$ = this.service.filterRecipesAction$;

  filteredRecipes$ = combineLatest([this.recipes$, this.filterRecipeAction$]).pipe(
    map((resultArray: [Recipe[], Recipe]) => {
      return resultArray[0].filter((recipe => {
        console.log(recipe.title?.toLowerCase().indexOf(resultArray[1]?.title?.toLowerCase() ?? ''));
        return recipe.title?.toLowerCase().indexOf(resultArray[1]?.title?.toLowerCase() ?? '') != -1
      }))
    })
  )

  constructor(private service: RecipesService) {}

  ngOnInit(): void {
    // --------------------- chapter 4 approach 1
    // this.subscription = this.service.getRecipes().subscribe((data) => {
    //   this.recipes = data;
    // })

    //  --------------- chater 4 approach 2
    // this.service.getRecipes().pipe(
    //   takeUntil(this.destroy$)).subscribe((result) => {
    //     this.recipes = result;
    //     console.log(this.recipes);
    //   });

      // this.practice();

     this.service.recipes$.pipe(takeUntil(this.destroy$))
     .subscribe((recipes) => {
      // this.recipes = recipes;
     })


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
