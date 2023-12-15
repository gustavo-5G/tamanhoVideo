noseX = 0
noseY = 0
rightX = 0
leftX = 0
distancia = 0
videoCanvas = ""

function preload(){
videoCanvas = createVideo("./video.mp4")
musica = loadSound("video.mp4")
}

function setup() {
    canvas = createCanvas(400, 400)
    canvas.position(600, 150)
    video = createCapture(VIDEO)
    video.size(550, 500)
    poseNet = ml5.poseNet(video, modelLoad)
    poseNet.on("pose", gotPoses)
    videoCanvas.size(400,400)
}


function modelLoad() {
    console.log("modelo foi iniciado")
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        leftX = results[0].pose.leftWrist.x
        rightX = results[0].pose.rightWrist.x
        distancia = floor(leftX - rightX)
        noseX = results[0].pose.nose.x
        noseY = results[0].pose.nose.y
    }
}

function draw() {
    document.getElementById("distancia").innerHTML = "Largura e Altura: "+ distancia + "px"
    video(videoCanvas,noseX,noseY,distancia)
    musica.play()

}