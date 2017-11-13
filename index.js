var video;
var canvas;
var ctx;
var hiddenCanvas;
var hiddenCtx;
var img;
var imgCanvas;
var imgCtx;
var imgData;
var tolerance = 60;
var r = 40;
var g = 156;
var b = 91;

window.onload = function() {
    img = document.createElement('img');
    img.onload = function() {
        imgCanvas = document.createElement("canvas");
        imgCanvas.width = video.width;
        imgCanvas.height = video.height;
        imgCtx = imgCanvas.getContext("2d");
        imgCtx.drawImage(img, 0, 0, imgCanvas.width, imgCanvas.height);
        imgData = imgCtx.getImageData(0, 0, imgCanvas.width, imgCanvas.height);

    };
    img.src = "a.jpg";

    video = document.querySelector('video');
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext("2d");
    hiddenCanvas = document.querySelector('#hidden');
    hiddenCtx = hiddenCanvas.getContext("2d");
    window.requestAnimationFrame(readColors);

    document.querySelector('#button').onclick = function() {
        document.querySelector('#canvas').className === 'hidden'?
        document.querySelector('#canvas').className = '':
        document.querySelector('#canvas').className = 'hidden';
    };

    /*
    document.querySelector('#r').onchange = function() {
        r = document.querySelector("#r").value;
    };
    document.querySelector('#g').onchange = function() {
        g = document.querySelector("#g").value;
    };
    document.querySelector('#b').onchange = function() {
        b = document.querySelector("#b").value;
    };
    document.querySelector('#tolerance').onchange = function() {
        tolerance = document.querySelector("#tolerance").value;
    };
    */
};

var readColors = function() {
    canvas.width = video.width;
    canvas.height = video.height;
    hiddenCanvas.width = video.width;
    hiddenCanvas.height = video.height;
    hiddenCtx.drawImage(video, 0, 0, hiddenCanvas.width, hiddenCanvas.height);


    if(imgCtx) {
        var vidImgData = hiddenCtx.getImageData(0, 0, hiddenCanvas.width, hiddenCanvas.height);

        for(var i=0; i <vidImgData.data.length; i+=4) {
            if(pixelMatch(vidImgData.data, i)) {
                vidImgData.data[i] = imgData.data[i];
                vidImgData.data[i+1] = imgData.data[i+1];
                vidImgData.data[i+2] = imgData.data[i+2];
                //vidImgData.data[i+3] = 255;
            };
        };
        ctx.putImageData(vidImgData, 0, 0);
    }
    window.requestAnimationFrame(readColors);
};

var pixelMatch = function(data, i) {
    var rMatch = (data[i] >= r - tolerance && data[i] <= r + tolerance);
    var gMatch = (data[i+1] >= g - tolerance && data[i+1] <= g + tolerance);
    var bMatch = (data[i+2] >= b - tolerance && data[i+2] <= b + tolerance);
    return rMatch && gMatch && bMatch;
}
