import { Routes } from '@angular/router';
import { LoginClienteComponent } from './components/login-cliente/login-cliente.component';
import { LoginRistoratoreComponent } from './components/login-ristoratore/login-ristoratore.component';
import { RegistrazioneClienteComponent } from './components/registrazione-cliente/registrazione-cliente.component';
import { RegistrazioneRistoratoreComponent } from './components/registrazione-ristoratore/registrazione-ristoratore.component';
import { HomeClienteComponent } from './components/home-cliente/client-home/home-cliente.component';
import { HomeRistoratoreComponent } from './components/ristoratore/home-ristoratore/home-ristoratore.component';
import { IndexComponent } from './components/index/index.component';
import { GenericHomeComponent } from './components/home-generico/generic-home/generic-home.component';
import { DettagliRistorantiComponent } from './components/home-generico/dettagli-ristoranti/dettagli-ristoranti.component';
import { AuthGuard } from './guards/auth.guard';
import { DishPageRistoratoreComponent } from './components/ristoratore/dish-page-ristoratore/dish-page-ristoratore.component';
import { IsRestaurantGuard } from './guards/is-restaurant.guard';
import { isClientGuard } from './guards/is-client.guard';
import { DishDetailRistoratoreComponent } from './components/ristoratore/dish-detail-ristoratore/dish-detail-ristoratore.component';
import { DishNewRistoratoreComponent } from './components/ristoratore/dish-new-ristoratore/dish-new-ristoratore.component';
import { IngredientPageRistoratoreComponent } from './components/ristoratore/ingredient-page-ristoratore/ingredient-page-ristoratore.component';
import { OrdinazioneCollaborativaComponent } from './components/home-cliente/ordinazione-collaborativa/ordinazione-collaborativa.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ReservationDetailRistoratoreComponent } from './components/ristoratore/reservation-detail-ristoratore/reservation-detail-ristoratore.component';
import { NotificationPageComponent } from './components/notification-page/notification-page.component';
import { PagamentoComponent } from './components/home-cliente/pagamento/pagamento.component';
import { RecensioneComponent } from './components/home-cliente/recensione/recensione.component';
import { PrenotazioneComponent } from './components/home-cliente/prenotazione/prenotazione.component';
import { PrenotazioniListComponent } from './components/home-cliente/prenotazioni-list/prenotazioni-list.component';

export const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    title: 'Home Page - Easy Meal',
  },
  {
    path: 'logout',
    component: LogoutComponent,
    title: 'Logout - Easy Meal',
  },
  {
    path: 'esplora',
    component: GenericHomeComponent,
    title: 'Esplora - Easy Meal',
  },
  {
    path: 'dettagli/:id',
    component: DettagliRistorantiComponent,
    title: 'Dettagli ristorante',
  },
  {
    path: 'cliente/registrazione',
    component: RegistrazioneClienteComponent,
    title: 'Registrazione Cliente',
  },
  {
    path: 'cliente/login',
    component: LoginClienteComponent,
    title: 'Login Page Cliente',
  },
  {
    path: 'cliente/home',
    component: HomeClienteComponent,
    canActivate: [AuthGuard, isClientGuard],
  },
  {
    path: 'ordinazione-collaborativa',
    component: OrdinazioneCollaborativaComponent,
    canActivate: [AuthGuard, isClientGuard],
  },
  {
    path: 'recensione/:id',
    component: RecensioneComponent,
    canActivate: [AuthGuard, isClientGuard],
  },
  {
    path: 'pagamento',
    component: PagamentoComponent,
    canActivate: [AuthGuard, isClientGuard],
  },
  {
    path: 'prenota/:id',
    component: PrenotazioneComponent,
    canActivate: [AuthGuard, isClientGuard],
  },
  {
    path: 'prenotazioni',
    component: PrenotazioniListComponent,
    canActivate: [AuthGuard, isClientGuard],
  },
  {
    path: 'notifiche',
    component: NotificationPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ristoratore/registrazione',
    component: RegistrazioneRistoratoreComponent,
    title: 'Registrazione Ristoratore',
  },
  {
    path: 'ristoratore/login',
    component: LoginRistoratoreComponent,
    title: 'Login Page Ristoratore',
  },
  {
    path: 'ristoratore/home',
    component: HomeRistoratoreComponent,
    canActivate: [AuthGuard, IsRestaurantGuard],
    title: 'Homepage Ristoratore - Easy Meal',
  },
  {
    path: 'ristoratore/reservations/:id',
    component: ReservationDetailRistoratoreComponent,
    canActivate: [AuthGuard, IsRestaurantGuard],
    title: 'Piatti Ristoratore - Easy Meal',
  },
  {
    path: 'ristoratore/dishes',
    component: DishPageRistoratoreComponent,
    canActivate: [AuthGuard, IsRestaurantGuard],
    title: 'Piatti Ristoratore - Easy Meal',
  },
  {
    path: 'ristoratore/dishes/new',
    component: DishNewRistoratoreComponent,
    canActivate: [AuthGuard, IsRestaurantGuard],
    title: 'Nuovo piatto Ristoratore - Easy Meal',
  },
  {
    path: 'ristoratore/dishes/:id',
    component: DishDetailRistoratoreComponent,
    canActivate: [AuthGuard, IsRestaurantGuard],
    title: 'Dettagli piatto Ristoratore - Easy Meal',
  },
  {
    path: 'ristoratore/ingredients',
    component: IngredientPageRistoratoreComponent,
    canActivate: [AuthGuard, IsRestaurantGuard],
    title: 'Ingredienti Ristoratore - Easy Meal',
  },
];
