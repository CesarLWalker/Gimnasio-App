import { addIcons } from 'ionicons';
import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { logOutOutline } from 'ionicons/icons';
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
    { title: 'Rutinas', url: '/rutinas', icon: 'barbell' },
    { title: 'Pagos', url: '/pagos', icon: 'cash' },
    { title: 'Profesores', url: '/profesores', icon: 'people' },
    { title: 'Liquidaciones', url: '/liquidaciones', icon: 'cash' },
    { title: 'Horas trabajadas', url: '/horas-trabajadas', icon: 'time' },
  ];

  public labels = [];
  public esLogin = false;

  private routeSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.esLogin = this.router.url.startsWith('/login');

    this.routeSubscription = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(event => {this.esLogin = event.urlAfterRedirects.startsWith('/login');
    });
    addIcons({logOutOutline});
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.routeSubscription.unsubscribe();
  }
}
