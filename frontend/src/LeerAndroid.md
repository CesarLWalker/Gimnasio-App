# Comandos para GitBash o cualquier shell
Para editar, ver los cambios
# Para poder verlo en LiveReload
ionic cap run android -l --external --target RFCY20T1VWV --public-host 192.168.0.211:8100

# 📌 Regla para el proyecto

# Cada vez que hagamos cambios en Angular y quieras probarlos en el celular:

ionic build
npx cap sync android
npx cap run android

En cambio, para trabajar rápido en la PC:

ionic serve

# 1️⃣ Abrí
angular.json

Buscá esta parte:

"budgets": [

y dentro debería haber algo parecido a:

{
  "type": "anyComponentStyle",
  "maximumWarning": "2kb",
  "maximumError": "4kb"
}
2️⃣ Cambiá solamente los valores

De:

"maximumWarning": "2kb",
"maximumError": "4kb"

a:

"maximumWarning": "6kb",
"maximumError": "8kb"

Así le estamos diciendo a Angular:

"Permití componentes con estilos de hasta 8 KB antes de considerar que el build tiene un error."

Esto no cambia visualmente la aplicación ni elimina ningún estilo.

# 👍 Esos 3 comandos alcanzan para actualizar la app del celular por USB:

ionic build
npx cap sync android
npx cap run android
Hacelos en ese orden

1️⃣ Compilar la aplicación

ionic build

2️⃣ Pasar los cambios al proyecto Android

npx cap sync android

3️⃣ Compilar e instalar en el celular conectado por USB

npx cap run android

Cuando termine el último comando deberías ver algo parecido a:

√ Running Gradle build
√ Deploying app-debug.apk to ...
[INFO] App deployed to device!

📱 Importante: antes del tercer comando, asegurate de que el celular esté conectado por USB y que tenga activada la Depuración USB.

# 