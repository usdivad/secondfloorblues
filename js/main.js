var ctx = new AudioContext();
var path = "assets/";
var assets = [
    {
        init: path+"01_init.mp3",
        loop: path+"01_loop.mp3",
        img: path+"01.png",
        dur: 710
    },
    {
        init: path+"02_init.mp3",
        loop: path+"02_loop.mp3",
        img: path+"02.png",
        dur: 1427
    },
    {
        init: path+"03_init.mp3",
        loop: path+"03_loop.mp3",
        img: path+"03.png",
        dur: 717
    },
    {
        init: path+"04_init.mp3",
        loop: path+"04_loop.mp3",
        img: path+"04.png",
        dur: 711
    },
    {
        init: path+"05_init.mp3",
        loop: path+"05_loop.mp3",
        img: path+"05.png",
        dur: 2711

    },
    {
        init: path+"06_init.mp3",
        loop: path+"06_loop.mp3",
        img: path+"06.png",
        dur: 1333
    },
    {
        init: path+"07_init.mp3",
        loop: path+"07_loop.mp3",
        img: path+"07.png",
        dur: 1322
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

    // check conductor loaded
    var loadedTimer = window.setInterval(function() {
        conductor.checkAllLoaded();
        if (conductor.all_loaded) {
            $("#playbackDetails").text("all loaded and good to go!");
            window.clearInterval(loadedTimer);
            console.log("cleared " + loadedTimer);
        }
    }, 100);

    // controls
    for (var i=0; i<loops.length; i++) {
        var id = "#sheet" + (i+1);
        $(id).on("click", function() {
            // console.log($(this));
            var idx = parseInt($(this).attr("index"));
            console.log(idx);

            // display
            $(".sheet").removeClass("selected");
            $(this).toggleClass("selected");

            // audio
            for (var j=0; j<loops.length; j++) {
                loops[j].activated = false;
            }
            loops[idx].activated = true;
            conductor.setupTransition(bpm, assets[idx].dur, [0], loops);
        });
    }
    $("#startBtn").on("click", function() {
        conductor.start();
        if (conductor.all_loaded) {
            $("#playbackDetails").text("playing");
        }
        else {
            $("#playbackDetails").text("audio not yet all loaded; try again soon~")
        }
    });
    $("#stopBtn").on("click", function() {
        conductor.stop();
        $("#playbackDetails").text("");
    });

}

window.onload = function() {
    init();
}

// function loadBuffers(sounds, buffers) {
//     for (var i=0; i<sounds.length; i++) {

//     }
// }

