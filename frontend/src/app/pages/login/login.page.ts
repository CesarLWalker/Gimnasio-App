import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { barbellOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [ FormsModule, IonIcon, IonButton, IonToolbar, IonHeader, IonTitle, IonHeader, IonContent, IonInput, IonItem, IonLabel ],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {
    addIcons({ barbellOutline });
   }

  ngOnInit() {
  }

  iniciarSesion() {
    
    if (!this.email.trim() || !this.password) {
      alert('Ingresá tu correo y contraseña.');
      return;
    }

    // Temporal: todavía no valida las credenciales con el backend.
    console.log('Formulario de login completado');

    alert('El formulario funciona. Próximo paso: conectar con el backend.');
  }
 

}
