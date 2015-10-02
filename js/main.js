var ctx = new AudioContext();
var path = "assets/";
var assets = [
    {
        mp3: path+"01.mp3",
        img: path+"01.png"
    },
    {
        mp3: path+"02.mp3",
        img: path+"02.png"
    },
    {
        mp3: path+"03.mp3",
        img: path+"03.png"
    },
    {
        mp3: path+"04.mp3",
        img: path+"04.png"
    },
    {
        mp3: path+"05.mp3",
        img: path+"05.png"
    },
    {
        mp3: path+"06.mp3",
        img: path+"06.png"
    },
    {
        mp3: path+"07.mp3",
        img: path+"07.png"
    }
];
var loops = [];

function init() {
    console.log("hello");
    for (var i=0; i<assets.length; i++) {
        var asset = assets[i];
        var loop = new Kino.Loop(asset["mp3"]);
        var sheet = "<div class='sheet' id='sheet" + (i+1) + "'><h4>" + (i+1) + ":</h4><img class='sheetimg' src='" + asset["img"] + "'/></div>";
        loops.push(loop);
        $("#sheets").append(sheet);
    }
    console.log("hoho");
}

window.onload = function() {
    init();
}

// function loadBuffers(sounds, buffers) {
//     for (var i=0; i<sounds.length; i++) {

//     }
// }

