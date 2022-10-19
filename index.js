const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const fs = require('fs');
var path = require('path');
const { info } = require('console');
const { Server } = require('http');
var moment = require('moment'); // require
const { arch } = require('os');
const favicon = require('serve-favicon');




const stream = require('stream');



const { stringify } = require('querystring');


moment().format('L');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use((_, res, next) => {

    res.header('Cross-Origin-Opener-Policy', 'same-origin');
    res.header('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});
app.use(express.static('public'))
// Set 'views' directory for any views  
// being rendered res.render() 
app.set('views', (__dirname, 'views'));
// Set view engine as EJS 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(clientErrorHandler);
app.use(cors());

app.listen(process.env.PORT || 5000)

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({ error: 'Something failed!' })
    } else {
        next(err)
    }
}

app.get('/', (req, res) => {
    let video =
    {
        title: "",
        likes: "",
        user: ""
    }
    res.render('index', { video })

})
app.post('/', express.json(), (req, res) => {
    
    async function crearvideo(link,archivo){
        ytdl(`${link}`, { quality: 'highestvideo', filter: 'audioandvideo' }).pipe(fs.createWriteStream(__dirname + "/public/videos/" + `${archivo}mp4`))    
    }
    async function crearaudio(link,archivo){
        ytdl(`${link}`, { quality: 'highestaudio', filter: 'audioonly' }).pipe(fs.createWriteStream(__dirname + "/public/videos/" + `${archivo}mp3`))    
    }
    async function crearvideoHD(link,archivo){
        ytdl(`${link}`, { quality: 'highestvideo', filter: 'videoonly' }).pipe(fs.createWriteStream(__dirname + "/public/videos/" + `${archivo}mp4`))    
    }

    async function obtenerinfo() {
        function makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() *
                    charactersLength));
            }
            return result;
        }
        let link = req.body.value
        let formato = req.body.formato

        if (ytdl.validateURL(link)) {
            let archivo = makeid(7) + moment().format('MMMMDh&mm') + ".";

            switch (formato) {
                case "mp3":
                    await crearaudio(link,archivo)
                    break;
                case "mp4low":
                    crearvideo(link,archivo)
                    break;
                case "mp4":
                    await crearvideoHD(link,archivo)
                    break;

                default:
                    break;
            }

    


            let info = await (ytdl.getInfo(link))

            let video =
            {
                archivo: archivo,
                error: false,
                title: (info.videoDetails.title).replace('.', '-'),
                likes: info.videoDetails.likes,
                user: info.videoDetails.author.name,
                image: info.videoDetails.thumbnails[3].url,
                formato: formato,

            }



            // var date = moment("2023-03-24")

            var date = fs.readdirSync('./public/videos');
            for (let index = 0; index < date.length; index++) {

                let archivoitem = date[index]
                archivoitem = archivoitem.substring(7)


                if (archivoitem < moment().subtract(7, 'm').format("MMMMDh&mm")) {
                    fs.unlink(__dirname + "/public/videos/" + `${date[index]}`, function (err) {
                        if (err) throw err;
                        
                    })
                    
                }

            }







            res.send({ video })


        } else {
            let video =

            {
                error: true,
                title: "porfavor",
                likes: "ingrese un link",
                user: "valido.",
                image: "https://static.wikia.nocookie.net/clubpenguinemoticons/images/4/45/Moody_Emoticon.png/revision/latest?cb=20150606040152",
                formato: ""
            }

            res.send({ video })

        }


    }

   
    obtenerinfo()






});
