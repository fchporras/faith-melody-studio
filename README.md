# Tu página de ventas, paso a paso

Esta carpeta es la página que vas a publicar. Hay tres diseños. Elige uno y ese es tu sitio. No tienes que saber programar: abres la carpeta en Antigravity o en VS Code, le dices a la IA qué quieres cambiar, y después la publicas en internet con GitHub y Vercel.

Haz los pasos en este orden. No te saltes ninguno. Si te saltas uno, el sitio no aparece o aparece vacío.

El video que acompaña esta página muestra la primera parte: abrir una ventana nueva, conectar esta carpeta y conversar con la IA. Aquí están los mismos pasos, escritos, para que puedas seguirlos aunque pauses el video.

| Carpeta | Cómo se ve | Nombre que trae escrito |
|---|---|---|
| `demo1` | Alegre. Azul marino, mandarina y amarillo. | Dear Song |
| `demo2` | Más sobrio. Azul, fotos en arcos. | Dear Song |
| `demo3` | Cálido. Vino, rosa y crema. Se puede ver en inglés y en español. | Casa Serenata |
| `demo4` | Moderno y oscuro. Tarjetas de vidrio tipo “bento”, violeta, aguamarina y lima. Junta todo lo de los tres demos y se puede ver en inglés y en español. | Melody Gift |
| demo5 | Radiante, jovial y hermoso. Marfil luminoso, luz dorada, azul celestial y esmeralda. Canciones y textos de fe, adoración, bautismos, bodas y homenajes. Junta todo lo de los demos y se puede ver en inglés y en español. | Faith Melody Studio |

Dear Song, Casa Serenata, Melody Gift y Faith Melody Studio son nombres de ejemplo o sugeridos. Cámbialos por el nombre de tu tienda antes de publicar.

---

## 1. Por qué se abre en Antigravity o en VS Code

La página es un grupo de archivos. El nombre de la tienda, los precios, el correo y el WhatsApp están en `config.js`. Los textos están en `index.html` y, en `demo3`, también en `text.js`.

No los edites a mano. Abre la carpeta entera en el programa y escríbele a la IA, en español, como le escribirías a una persona:

- “Cambia el nombre de la tienda a …”
- “Pon este correo para los pedidos: …”
- “Pon este WhatsApp, con código de país: …”
- “Quiero el diseño de `demo2`. Cambia el título por …”
- “Sube esta carpeta a mi repositorio de GitHub.”

La IA modifica los archivos. Tú revisas y aceptas. Así no se rompe la página por borrar una coma.

Antigravity es el programa de Google para trabajar con una IA dentro de la carpeta. También puedes usar VS Code con la extensión de Antigravity, o el chat de GitHub Copilot. Elige uno y quédate con ese.

---

## 2. Abre esta carpeta

La carpeta que hay que abrir es la que contiene `demo1`, `demo2` y `demo3`. No abras solo `demo1`. Si abres solo una, la IA no ve las otras.

### Antigravity

1. Si no lo tienes, descárgalo en [antigravity.google/download](https://antigravity.google/download) e instálalo.
2. Ábrelo e inicia sesión con tu cuenta de Google cuando te lo pida. Sin sesión, el chat no responde.
3. Si ya hay otra carpeta abierta, ve a **File → New Window**. Trabaja en esa ventana nueva, no en la carpeta de otra persona.
4. En la pantalla de inicio pulsa **Open Folder**. Elige la carpeta `chorus777-sales-pages` y pulsa **Open** (en Windows, **Seleccionar carpeta**).
5. Abre el chat. En Mac es `Cmd + L`. En Windows es `Ctrl + L`. Si no se abre, pulsa **Toggle Agent** en la barra de arriba.
6. Escribe lo que quieres cambiar y pulsa Enter.
7. Cuando la IA termine, arriba del cuadro de texto aparece una barra con los archivos cambiados. Léelos. Si están bien, pulsa **Accept all**. Si no aceptas, el cambio no se queda.

### VS Code

1. Abre VS Code.
2. Ve a **File → New Window**.
3. En esa ventana, ve a **File → Open Folder** y elige `chorus777-sales-pages`.
4. Instala el chat, si aún no está:
   - Ve a **View → Extensions**.
   - Busca **Google Antigravity**.
   - Pulsa **Install** e inicia sesión con tu cuenta de Google.
   - Pulsa el icono de Antigravity en la barra de la izquierda.
   - Si en vez de eso usas GitHub Copilot, pulsa el icono del chat arriba a la derecha e inicia sesión en GitHub.
5. Escribe el cambio y acepta los archivos que te proponga antes de seguir.

---

## 3. Crea el repositorio en GitHub

GitHub guarda la copia de tu página. Vercel, en el paso 5, lee esa copia y la publica. Primero tiene que existir el repositorio, vacío.

1. Entra en [github.com/signup](https://github.com/signup).
2. Crea la cuenta con tu correo. Anota el usuario: es la palabra que va después de `github.com/` en tu página.
3. Abre el correo de GitHub y pulsa el botón de verificación. Si no verificas el correo, no te deja crear el repositorio.
4. Entra en [github.com](https://github.com). Arriba a la derecha pulsa el **+** y luego **New repository**.
5. En **Repository name** escribe un nombre sin espacios. Por ejemplo: `mi-tienda-canciones`.
6. Elige **Public**.
7. No marques nada más. Esto es fácil de saltarse y luego el envío falla:
   - **Add a README file**: apagado.
   - **Add .gitignore**: **None**.
   - **Add license**: **None**.
   - Si ves un cuadro para que Copilot rellene el repositorio, déjalo vacío.
8. Pulsa **Create repository**.
9. Se abre una página que dice que el repositorio está vacío y muestra una dirección como `https://github.com/TU-USUARIO/mi-tienda-canciones`. Déjala abierta. La vas a pegar en el chat.

---

## 4. Dile a la IA qué cambiar y que lo suba

Vuelve a Antigravity o a VS Code, con esta carpeta abierta. Pega esto en el chat y rellena los huecos:

```text
Esta carpeta es mi página de ventas. Trabaja solo aquí.

1. En demo2, cambia la tienda a este nombre: NOMBRE DE TU TIENDA.
2. En config.js de esa demo, pon este correo de pedidos: TU-CORREO
   y este WhatsApp, solo números con código de país: 15551234567
3. No inventes opiniones de clientes ni cifras de ventas.
4. Cuando termines, sube TODA esta carpeta al repositorio vacío
   https://github.com/TU-USUARIO/mi-tienda-canciones
   en la rama main.
   Incluye las carpetas media. No subas contraseñas.
5. Si GitHub pide iniciar sesión, abre el navegador y espera a que yo
   termine el inicio de sesión. No sigas sin eso.
6. No publiques en Vercel. Al terminar, dime la dirección del repositorio
   y para. La conexión con Vercel la hago yo en el navegador.
```

Cambia `demo2` por `demo1` o `demo3` si elegiste otro diseño. En `demo3` puedes añadir: “Los textos en español están en `text.js`. Cámbialos también.”

Mientras trabaja:

1. Si se abre el navegador de GitHub, o te muestra un código de inicio de sesión, complétalo. No cierres esa ventana. Es el paso que más se abandona.
2. Cuando te muestre los archivos, pulsa **Accept all** si el nombre, el correo y el WhatsApp son los tuyos.
3. Espera a que te diga que ya está en GitHub.
4. Vuelve a la pestaña del repositorio y recarga la página. Tienes que ver las carpetas `demo1`, `demo2` y `demo3`. Si la página sigue diciendo que el repositorio está vacío, dile a la IA: “El repositorio sigue vacío. Termina de subirlo a la rama main y dime cuando se vean las carpetas.”

Si al crear el repositorio marcaste **Add a README file** y el envío falla, dile: “El repositorio ya tenía un README. Conserva nuestros archivos, resuelve el conflicto y súbelos a main.”

---

## 5. Conecta el repositorio en Vercel

Esta parte se hace en el navegador. La IA de tu computadora no puede pulsar estos botones por ti.

1. Entra en [vercel.com/signup](https://vercel.com/signup).
2. Pulsa **Continue with GitHub**. No crees la cuenta con otro correo: Vercel tiene que usar el mismo usuario de GitHub del paso 3.
3. GitHub te pide autorizar a Vercel. Pulsa **Authorize** (o **Autorizar**). Si pregunta qué repositorios puede ver, elige el que acabas de crear, o **All repositories**. Pulsa **Save** si hace falta. Sin esta autorización, tu repositorio no sale en la lista.
4. En el tablero de Vercel, arriba a la derecha pulsa **Add New…** y luego **Project**. En algunas cuentas el botón dice **Create New** y después **Project**. Es el mismo lugar.
5. En **Import Git Repository** busca `mi-tienda-canciones`. Pulsa **Import**.
6. Si no aparece:
   - Mira arriba a la izquierda que esté elegida tu cuenta de GitHub, no otra.
   - Pulsa **Adjust GitHub App Permissions**. Si no hay ningún repositorio, el botón dice **Configure GitHub App**.
   - Añade este repositorio y guarda.
   - Vuelve a Vercel y búscalo otra vez.
7. Antes de publicar, en la pantalla de configuración haz estas tres cosas. No pulses **Deploy** todavía.
   - **Root Directory**: pulsa **Edit** y escribe la carpeta que elegiste, exactamente así: `demo1`, `demo2` o `demo3`. Pulsa **Continue**. Si dejas este campo vacío, Vercel publica la carpeta de arriba, donde no está la página, y el sitio sale en blanco.
   - **Framework Preset**: elige **Other**.
   - **Build Command**: enciende **Override** y deja el cuadro vacío. Esta página no se compila. Si Vercel intenta compilarla, el despliegue falla.
8. Ahora sí, pulsa **Deploy**.
9. Espera a que diga **Congratulations** o que el estado pase a **Ready**. Pulsa la imagen del sitio, o el botón para visitarlo. La dirección es parecida a `mi-tienda-canciones.vercel.app`. Ábrela. Esa es tu página, en internet.
10. Comprueba, en este orden:
    - Se ve el nombre de tu tienda, no Dear Song ni Casa Serenata.
    - Pulsas play en una canción y suena.
    - Arrastras la barra de la canción y salta de sitio.
    - El botón de encargar la canción abre el formulario.
    - Si elegiste `demo3`, el botón ES cambia la página al español.

A partir de ahora, cada vez que la IA suba un cambio a la rama `main`, Vercel publica solo la página nueva. No vuelvas a pulsar Deploy.

Para un cambio posterior, escribe en el chat: “Cambia … y súbelo a la rama main del mismo repositorio de GitHub.” Espera a que termine. Recarga tu dirección `.vercel.app` un minuto después.

---

## Si algo no se ve

- **El sitio abre y está en blanco.** En Vercel entra al proyecto, ve a **Settings → Build and Deployment → Root Directory**, escribe `demo1`, `demo2` o `demo3`, guarda, y en **Deployments** abre el último y pulsa **Redeploy**.
- **El despliegue sale en rojo.** Casi siempre intentó compilar. Vuelve a dejar **Framework Preset** en **Other** y **Build Command** vacío, y pulsa **Redeploy**.
- **No está tu repositorio.** Repite el punto 6 del paso 5. Tiene que ser el mismo usuario de GitHub en las dos webs.
- **El comprador no puede enviar el pedido.** `orderEmail` o `whatsapp` en `config.js` siguen vacíos. Pídele a la IA que los rellene y que lo suba otra vez. Mientras los dos estén vacíos, el comprador solo puede copiar el texto del pedido.
