# JuanData - Frontend

Frontend de JuanData desarrollado con Angular.

## Como clonar el proyecto

Abre una terminal y ejecuta:

```bash
git clone https://github.com/barojas-gif/Fronted-JuanData.git
```

Entra a la carpeta del proyecto:

```bash
cd Fronted-JuanData
```

## Que hacer despues de clonar

Instala las dependencias:

```bash
npm install
```

Crea los archivos de entorno a partir de los ejemplos:

```bash
copy src\environments\environment.example.ts src\environments\environment.ts
copy src\environments\environment.prod.example.ts src\environments\environment.prod.ts
```

Si usas macOS o Linux:

```bash
cp src/environments/environment.example.ts src/environments/environment.ts
cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts
```

Si el backend no esta en `http://localhost:8080`, cambia la URL en:

```text
src/environments/environment.ts
```

## Ejecutar el proyecto

Inicia el servidor local:

```bash
npm start
```

Abre el navegador en:

```text
http://localhost:4200/
```

## Compilar el proyecto

Para generar la version de produccion:

```bash
npm run build
```

El frontend necesita que el backend este ejecutandose para iniciar sesion y cargar datos.
