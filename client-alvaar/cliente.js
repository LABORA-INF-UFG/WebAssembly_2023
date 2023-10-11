const videoOrWebcam = document.createElement('video'); // Cria uma tag <video> para exibir o feed da webcam.

navigator.mediaDevices.getUserMedia({ video: true }) // Solicita permissão para acessar a webcam.
  .then((stream) => {
    videoOrWebcam.srcObject = stream; // Define o stream da webcam como a origem do vídeo.
    videoOrWebcam.play(); // Inicia a reprodução do vídeo.
  })
  .catch((error) => {
    console.error('Erro ao acessar a webcam:', error);
  });

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Adiciona um event listener para chamar a função loop quando o vídeo estiver pronto.
videoOrWebcam.addEventListener('loadedmetadata', () => {
  canvas.width = videoOrWebcam.videoWidth;
  canvas.height = videoOrWebcam.videoHeight;

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(videoOrWebcam, 0, 0, canvas.width, canvas.height);
    let frame = ctx.getImageData(0, 0 , canvas.width, canvas.height)
    console.log(frame);
    requestAnimationFrame(loop); // Chama o loop continuamente para criar uma animação.
  }

  loop(); // Inicia o loop.
});
