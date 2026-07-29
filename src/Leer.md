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

#  Utilizando console.log(); para corroborar
public editarCliente(cliente: Cliente): void {
  console.log('Editar cliente:', cliente);
  this.router.navigate(['/clientes/nuevo-cliente', cliente.id]);
}

O incluso, cuando comprobemos que la navegación funciona, directamente eliminaría el console.log:

public editarCliente(cliente: Cliente): void {
  this.router.navigate(['/clientes/nuevo-cliente', cliente.id]);
}

## En producción no solemos dejar console.log() salvo que estemos depurando un problema.

# ¿Qué hace este código?
1. Obtiene el ID de la URL
const id = this.activatedRoute.snapshot.paramMap.get('id');

Si la URL es:

/clientes/nuevo-cliente/3

entonces:

id = "3"

Si la URL es:

/clientes/nuevo-cliente

entonces:

id = null
2. Verifica si hay un ID
if (id)

Solo entra si estamos editando.

3. Busca el cliente
const clienteEncontrado = this.clienteService.getClienteById(Number(id));

Usamos Number(id) porque el parámetro de la URL llega como texto (string), pero nuestro método espera un number.

4. Carga los datos en el formulario
this.cliente = { ...clienteEncontrado };

Fijate que nuevamente usamos el operador de propagación (...).

No hacemos:

this.cliente = clienteEncontrado;

porque eso haría que ambos objetos apuntaran a la misma referencia. Si empezaras a escribir en el formulario, estarías modificando el cliente de la lista incluso antes de guardar.

Con:

     this.cliente = { ...clienteEncontrado };

trabajamos sobre una copia, que es mucho más seguro.

5. Activamos el modo edición
this.modoEdicion = true;

Más adelante esta variable nos servirá para decidir si el botón debe crear o actualizar un cliente.

# 