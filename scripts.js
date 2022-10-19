const fs = require('fs');
const ytdl = require('ytdl-core');

class descargar {
    static async a() {

    let urllink = document.getElementById("URL").value

    ytdl(`${urllink}`)
        .pipe(fs.createWriteStream('video.mp4'));
        
    console.log("asdasd")
}

}
module.exports = descargar