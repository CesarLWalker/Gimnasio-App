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
