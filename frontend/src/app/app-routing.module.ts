import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'clientes',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/clientes/clientes.module').then( m => m.ClientesPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'profesores',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/profesores/profesores-routing.module').then( m => m.ProfesoresPageRoutingModule)
  },
  {
    path: 'pagos',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/pagos/pagos.module').then( m => m.PagosPageModule)
  },
  {
    path: 'liquidaciones',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/profesores/liquidaciones/liquidaciones.module').then( m => m.LiquidacionesPageModule)
  },
  {
    path: 'horas-trabajadas',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/horas-trabajadas/horas-trabajadas.module').then( m => m.HorasTrabajadasPageModule)
  },
  {
    path: 'rutinas',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/rutinas/rutinas.module').then( m => m.RutinasPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
