$(document).ready(function(){
    // lấy danh sách user    
    $.post("./users-list", {Token:getCookie("userToken")}, function(data){
        if(data.result==-1){
            alert(data.errMsg);
        }else{
            $("#list_Users").html("");
            data.forEach(function(user){
                var uA = "on";
                if(user.Active==false){
                    uA = "off";
                }

                var type = "Khách";
                if(user.userGroup==1){
                    type="<font color=red>Admin</font>";
                }
                $("#list_Users").append(`
                <tr idUser="1111">
                    <th scope="row">`+ user.Email +`</th>
                    <td><img class="avatar" src="./upload/avatar/`+ user.Image +`" /></td>
                    <td><img class="onoff" src="./img/`+ uA +`.png" /></td>
                    <td>`+ type +`</td>
                </tr> 
                `);
            });
        }
    });

    //upload file
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

});

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
  
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}
