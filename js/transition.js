$("#button").on("click", function(){
    let input     = document.getElementById("input");
    let key_word  = input.value;
    $("#button").remove();
    location.href = "result.html?key="+key_word;
});



