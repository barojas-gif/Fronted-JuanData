/* ---------------------------------------------------------
   Visor PDF.js sencillo
   Lee ?file=URL     ↳  Renderiza todas las páginas a <canvas>
----------------------------------------------------------*/

// 1. Configura la ruta del worker (requerido)
pdfjsLib.GlobalWorkerOptions.workerSrc =
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// 2. Obtiene la URL del PDF de la query (?file=…)
const params  = new URLSearchParams(window.location.search);
const fileUrl = params.get('file');

const viewer  = document.getElementById('viewer');

/* Si falta el parámetro, muestra mensaje */
if (!fileUrl) {
  viewer.textContent = 'Parámetro "file" no encontrado en la URL.';
  viewer.style.color = 'red';
  throw new Error('file query param missing');
}

/* 3. Carga el documento */
pdfjsLib
  .getDocument(fileUrl)
  .promise
  .then(renderPDF)
  .catch(err => {
    console.error(err);
    viewer.textContent = 'Error al abrir el PDF.';
    viewer.style.color = 'red';
  });

/* ---------------------------------------------------------
   Función para renderizar todas las páginas
----------------------------------------------------------*/
async function renderPDF(pdf) {
  viewer.innerHTML = '';          // Limpia “Cargando…”

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);

    // Puedes ajustar scale si necesitas más/menos resolución
    const viewport = page.getViewport({ scale: 1.5 });

    // Canvas para la página
    const canvas  = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width  = viewport.width;
    canvas.height = viewport.height;

    // Renderiza y espera a que termine
    await page.render({ canvasContext: context, viewport }).promise;

    viewer.appendChild(canvas);
  }
}
