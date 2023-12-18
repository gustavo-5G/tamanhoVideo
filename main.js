let noseX = 0;
let noseY = 0;
let rightX = 0;
let leftX = 0;
let distancia = 0;
let videoCanvas;
let video;

function preload() {
  videoCanvas = createVideo("./video.mp4");
}

function setup() {
  canvas = createCanvas(400, 400);
  canvas.position(600, 150);

  // Usando createCapture para a entrada de vídeo da webcam
  video = createCapture(VIDEO);
  video.size(550, 500);

  // Inicializando o modelo PoseNet
  poseNet = ml5.poseNet(video, modelLoad);
  poseNet.on("pose", gotPoses);

  // Ocultando o vídeo da webcam
  video.hide();

  // Definindo o tamanho do vídeoCanvas
  videoCanvas.size(400, 400);
  // Inicializando o vídeo do arquivo mp4
}

function modelLoad() {
  console.log("Modelo foi iniciado");
}

function gotPoses(results) {
  if (results.length > 0) {
    // Obtendo as coordenadas dos pulsos e do nariz
    leftX = results[0].pose.leftWrist.x;
    rightX = results[0].pose.rightWrist.x;
    distancia = floor(leftX - rightX);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;

    // Ajustando a posição e a largura do vídeoCanvas com base nas coordenadas do nariz
    videoCanvas.position(noseX, noseY);
    videoCanvas.size(distancia, distancia);
  }
}

function draw() {
  // Atualizando a largura e a posição do vídeoCanvas
  document.getElementById("distancia").innerHTML =
    "Largura e Altura: " + distancia + "px";

  // Exibindo o vídeoCanvas
  image(video, 0, 0, width, height);
}
