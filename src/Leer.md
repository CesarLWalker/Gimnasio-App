# Creando las 4 tarjetas individualmente
<ion-col size="6">
        <ion-card>
          <ion-card-header>
            <ion-card-title> 👥 Clientes</ion-card-title>
          </ion-card-header>
            <ion-card-content>
              <h1>152</h1>
              <p>Total registrados</p>
            </ion-card-content>
        </ion-card>
      </ion-col>

      <ion-col size="6">
       <ion-card>
         <ion-card-header>
           <ion-card-title>💰 Recaudado </ion-card-title>
         </ion-card-header>
          <ion-card-content>
            <h1>$2.350.000</h1>
            <p>Este mes</p>
          </ion-card-content>
       </ion-card>
      </ion-col>

      <ion-col size="6">
       <ion-card>
         <ion-card-header>
           <ion-card-title> 👨‍🏫 Profesores</ion-card-title>
         </ion-card-header>
          <ion-card-content>
            <h1>4</h1>
            <p>Profesores Activos</p>
          </ion-card-content>
       </ion-card>
      </ion-col>

      <ion-col size="6">
       <ion-card>
         <ion-card-header>
           <ion-card-title>💳 Pendiente</ion-card-title>
         </ion-card-header>
          <ion-card-content>
            <h1>$385.000</h1>
            <p>Por cobrar</p>
          </ion-card-content>
       </ion-card>
      </ion-col>

# Con #formCliente="ngForm" Angular nos permite saber si el formulario es válido.
<form #formCliente="ngForm" (ngSubmit)="guardarCliente()">

# Mientras falte un dato obligatorio: el botón estará deshabilitado.
Cuando el formulario sea válido: el botón se habilitará automáticamente.
[disabled]="formCliente.invalid">Guardar

# #nombre="ngModel"
Con eso Angular nos permite saber:

si el campo fue tocado (touched),
si fue modificado (dirty),
si es válido (valid),
si es inválido (invalid).

# ¿Por qué primero touched?
Porque si no lo usamos, la página mostraría todos los errores apenas se abre, incluso antes de que el usuario empiece a escribir.

## Con touched:
Abrís la pantalla → no aparecen errores.
Tocás el campo y lo dejás vacío → aparece el mensaje.

# Inyección de dependencia en Angular
Esa forma de trabajar es la que te va a servir cuando uses:

HttpClient
ActivatedRoute
AlertController
ToastController
LoadingController

Todos funcionan con el mismo principio. Ej.
  
  constructor (
    private clienteService: ClienteService,
    private router: Router
  ) {}

#   