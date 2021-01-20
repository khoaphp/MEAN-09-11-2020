$(document).ready(function(){
    $("#userAvatar").change(function(){
        
        var data = new FormData();
            jQuery.each(jQuery('#userAvatar')[0].files, function(i, file) {
                console.log('file-'+i);
                data.append('file-'+i, file);
            });

            jQuery.ajax({
                url: './uploadImage',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST', // For jQuery < 1.9
                success: function(data){
                    console.log(data);
                    if(data.result==1){
                        $("#imgAvatar").attr("src", "./upload/avatar/" + data.file);
                        $("#hidAvatar").val(data.file);
                    }else{
                        alert("Upload image faile! " + data.errMsg);
                    }
                }
            });

    });

    $("#btnRegister").click(function(){
        $.post("./register", {
            Email:$("#email").val(),
            Password:$("#password").val(),
            RePassword:$("#repassword").val(),
            Image:$("#hidAvatar").val(),
            Name:$("#Fullname").val(),
            Address:$("#Address").val(),
            Phone:$("#Phone").val()
        }, function(data){
            console.log(data);
        });
    });

});