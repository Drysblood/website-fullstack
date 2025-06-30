import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Projecte } from './pages/projecte/projecte';
import { Service } from './pages/service/service';
import { Kontakt } from './pages/kontakt/kontakt';
import { Profile } from './pages/profile/profile';
import { Login } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { adminGuard } from './services/admin.guard';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: Home },
  { path: 'projecte', component: Projecte },
  { path: 'service', component: Service },
  { path: 'kontakt', component: Kontakt },
  { path: 'profile', component: Profile },
  { path: 'login', component: Login },
  { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] },
];
