var ctx = new AudioContext();
var path = "assets/";
var assets = [
    {
        init: path+"01_init.wav",
        loop: path+"01_loop.wav",
        img: path+"01.png",
        dur: 710
    },
    {
        init: path+"02.mp3",
        img: path+"02.png",
        dur: 500
    },
    {
        init: path+"03.mp3",
        img: path+"03.png"
    },
    {
        init: path+"04.mp3",
        img: path+"04.png"
    },
    {
        init: path+"05.mp3",
        img: path+"05.png"
    },
    {
        init: path+"06.mp3",
        img: path+"06.png"
    },
    {
        init: path+"07.mp3",
        img: path+"07.png"
    }
];
var loops = [];
var conductor;
var bpm = 10; // 1 beat per ms
var dur = assets[0].dur;

function init() {
    console.log("hello");

    // audio
    for (var i=0; i<assets.length; i++) {
        var asset = assets[i];
        var asset_init = asset.init;
        var asset_loop = asset.loop;
        var loop;
        if (asset_loop === undefined) {
            loop = new Kino.Loop(asset_init);
        }
        else {
            loop = new Kino.Loop(asset_init, asset_loop);
        }

        // loop.activated = false;
        loops.push(loop);

        var sheet = "<div class='sheet' index='" + i + "' id='sheet" + (i+1) + "'><h4>" + (i+1) + ":</h4><img class='sheetimg' src='" + asset["img"] + "'/></div>";
        $("#sheets").append(sheet);
    }
    console.log("hoho");
    for (var i=0; i<loops.length; i++) {
        loops[i].activated = false;
        // loops[i].loop.loop(1);
    }
    loops[0].activated = true;
    conductor = new Kino.Conductor(bpm, dur, [0], loops, function(){}, function(){}, function(){});
    $("#sheet1").addClass("selected");

    // controls
    for (var i=0; i<loops.length; i++) {
        var id = "#sheet" + (i+1);
        $(id).on("click", function() {
            // console.log($(this));
            var idx = parseInt($(this).attr("index"));
            $(".sheet").removeClass("selected");
            $(this).toggleClass("selected");

            for (var j=0; j<loops.length; j++) {
                loops[j].activated = false;
            }
            loops[idx].activated = true;
            conductor.setupTransition(bpm, assets[idx].dur, [0], loops);
        });
    }

}

window.onload = function() {
    init();
}

// function loadBuffers(sounds, buffers) {
//     for (var i=0; i<sounds.length; i++) {

//     }
// }

