$(document).ready(function(){
    $("#formulario").on("submit",function(event){
        event.preventDefault();
        let value = $("#URL").val();

        $.ajax({
            url: "/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify({value}),
            success: function(res){
                $("#videotitle").html(`Nombre: ${res.video.title}`);
                $("#videouser").html(`autor: ${res.video.user}`);
                $("#videolikes").html(`likes: ${res.video.likes}`);
                $("#botondedescarga0").attr("download",`${res.video.title}.mp3`);
                $("#botondedescarga0").attr("href",`${res.video.archivo}.mp3`);
                $("#videoimage").attr("src",`${res.video.image}`);
                $("#loader").css("display","none");
                $("#botondedescarga").css("display","inline-block")
                
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
console.log("ads")