$(document).ready(function(){


    var userToken = getCookie("userToken");
    var pathName = window.location.pathname
    var arrCheckAdminPage = ["/admin/user"];

    if(userToken.length>0){
        $.post("./verifyAdmin", {Token:userToken}, function(data){
            if(data.result==1){
                $("#userName").html(data.user.data.Name);
                $("#frmLogout").html(`<button class="btn btn-outline-success" type="submit" id="btnLogout">Logout</button>`);
            }else{
                if(arrCheckAdminPage.includes(pathName)){
                    window.location = "./login";
                }
            }
        });
    }else{
        if(arrCheckAdminPage.includes(pathName)){
            window.location = "./login";
        }
    }
    

    /* Không chạy do btnLogout phát sinh bằng mã js
    $("#btnLogout").click(function(){
        alert(1);
    });
    */

    $(document).on("click", "#btnLogout", function(e){
        $.post("./logout", {Token:getCookie("userToken")},  function(data){
            if(data.result==1){
                setCookie("userToken", "xxx", 0);
                window.location = "./login";
            }else{
                alert(data.errMsg);
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