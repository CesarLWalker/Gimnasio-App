import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { barbellOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ FormsModule, IonIcon, IonButton, IonToolbar, IonHeader, IonTitle, IonContent, IonInput, IonItem ],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ barbellOutline });
   }

  ngOnInit() {
  }

  iniciarSesion(): void {

    if (!this.username.trim() || !this.password) {
      alert('Ingresá tu usuario y contraseña.');
      return;
    }

    if (this.cargando) {
      return;
    }

    this.cargando = true;

    this.authService.login({
      username: this.username.trim(),
      password: this.password
    }).subscribe({next: () => {
      this.cargando = false;
      this.router.navigateByUrl('/dashboard');
    },
  error: (error) => {
    this.cargando = false;
    console.log('Error al iniciar sesión:', error);

    if (error.status === 0) {
      alert('No se pudo conectar con el servidor. Verificá que el backend esté funcionando.');
    } else if (error.status === 401) {
      alert('Usuario o contraseña incorrectos.');
    } else {
      alert(error.error?.message || 'Ocurrió un error al iniciar sesión.');
    }
  }})

  }
}
