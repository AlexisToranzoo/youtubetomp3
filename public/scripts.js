


$(document).ready(
    
    async function(){
    $("#formulario").on("submit",function(event){
        event.preventDefault();
        let value = $("#URL").val();
        let formato = $("#FORMATO").val();
        console.log(formato)
        $.ajax({
            url: "/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({value,formato}),
            success: function(res){
                $("#videotitle").html(`Nombre: ${res.video.title}`);
                $("#videouser").html(`autor: ${res.video.user}`);
                $("#videolikes").html(`likes: ${res.video.likes}`);
                $("#botondedescarga0").attr("download",`${res.video.title}`);
                $("#botondedescarga0").attr("href",`/videos/${res.video.archivo+(formato === "mp3" ? "mp3" : "mp4")}`);
                $("#videoimage").attr("src",`${res.video.image}`);
                $("#loader").css("display","none");
                $("#botondedescarga").css("display","inline-block")
                $("#iddedescarga").attr("value",`${res.video.archivo}`);
                $("#formatocontainer").html(`FORMATO: ${res.video.formato}`);
                
                
            }
        })
       
            
        

    })

})

function cargarloader(){
    document.getElementById("loader").style.display = "grid"
    document.getElementById("videotitle").innerText = ""
    document.getElementById("videolikes").innerText = ""
    document.getElementById("videouser").innerText = ""
    $("#videoimage").attr("src",``)
    document.getElementById("botondedescarga").style.display = "none"
    document.getElementById("hayerror").value = true ? document.getElementById("botondedescarga").style.display = "none" : console.log("ok")
    
}



async function existe(archivo) {

    console.log(fs.existsSync(`${__dirname}/public/videos/${archivo}mp3`) + "DSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
}

console.log("ads")