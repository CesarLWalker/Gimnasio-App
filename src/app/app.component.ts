import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Dashboard', url: '/dashboard', icon: 'home' },
    { title: 'Clientes', url: '/clientes', icon: 'people' },
    { title: 'Pagos', url: '/pagos', icon: 'cash' },
    { title: 'Profesores', url: '/profesores', icon: 'people' },
    { title: 'Liquidaciones', url: '/liquidaciones', icon: 'cash' },
    { title: 'Horas trabajadas', url: '/horas-trabajadas', icon: 'time' },
  ];
  public labels = [];
  constructor() {}
}
