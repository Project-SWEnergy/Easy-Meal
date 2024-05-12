import { Component, inject } from '@angular/core';
import { DishItemComponent } from '../../item/dish-item/dish-item.component';
import { MatCardModule } from '@angular/material/card';
import { Dish } from '../../../interfaces/dish';
import { DishesRistoratoreService } from '../../../services/ristoratore/dishes.ristoratore.service';
import { Router, RouterModule } from '@angular/router';
import { ObservableService } from '../../../services/lib/observable.service';

@Component({
  selector: 'app-dish-page-ristoratore',
  standalone: true,
  imports: [DishItemComponent, MatCardModule],
  templateUrl: './dish-page-ristoratore.component.html',
  styleUrl: './dish-page-ristoratore.component.css',
})
export class DishPageRistoratoreComponent {
  dishes: Dish[];
  dishes_get = inject(DishesRistoratoreService);
  router = inject(Router);

  async ngOnInit(): Promise<void> {
    this.dishes_get
      .get()
      .then((res) => {
        if (res) {
          this.dishes = res;
        } else {
          throw 'something went wrong in the get of the dishes';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  onCardClicked(dish: Dish) {
    this.router.navigate(['ristoratore/dishes/' + dish.id]);
  }

  onNewDishClicked() {
    this.router.navigate(['ristoratore/dishes/new']);
  }
}
