var text="";

$("#list").on("click",".comin",function(){
    var doc=$(this);
    $.post( window.location.origin+"/api/main/"+$(this).attr("value"), function( data ) {
        console.log(data);
        if(isNaN(data))
        window.location.replace(window.location.origin+"/login");

        else
       // console.log(doc.html());
        doc.children(".counter").html(+data);
        
    })
        // $("#txt-field").val(text);
        // $("#search").click();
        // })
    return false;
});

$("#search").on("click",function(){
    text=$("#txt-field").val();
   
    
        $.get( window.location.origin+"/api/main/"+text, function( data ) {
 console.log(data);
            var html=data.reduce(barCreate,"");
           
            $("#list").html(html);
            data.forEach(function(val){
                $.get( window.location.origin+"/api/count/"+val.name, function( data ) {
                    $('button[value="'+val.name+'"]').children().html(data);
                })
            })
            //var str=data.reduce(addButton,'');
        //$( "#pollsList" ).html( str);
        //console.log(str);

    });


})
$(document).keypress(function(e){
    if (e.which == 13){
        $("#search").click();
    }
});
function barCreate(str,val){
    str+='\n<a href="'+val.url+'">';
    str+='<div class="entry container-fluid">';
    str+='<img  width="100px" height="100px" src="'+val.img+'">';
    str+='<span class="title">'+val.name+'</span>';
    str+='<button type="submit" value="'+val.name+'"class="btn comin">Im coming: <span class="counter">0</span></button>';
    str+='<br>';
    str+='<span class="info">'+val.phone+'</span>';
    str+='</div></a>';
    return str;
    
}

function barCreate2(str,val){
    str+='\n<div class="entry container-fluid">';
    str+='<a href="'+val.url+'">';
    str+='<img  width="100px" height="100px" src="'+val.img+'"></a>';
    str+='<span class="title">'+val.name+'</span>';
    str+='<button value="'+val.name+'"class="btn comin">Im coming: <span class="counter">0</span></button>';
    str+='<br>';
    str+='<span class="info">'+val.phone+'</span>';
    str+='</div>';
    return str;
    
}