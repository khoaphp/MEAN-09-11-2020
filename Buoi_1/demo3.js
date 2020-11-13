var docdac = "659803";

var tong = 0;
var veso = "";
while(veso != docdac){
    var veso = "";
    tong = tong + 1;
    for(var i=1; i<=6; i++){
        veso = veso + Math.floor(Math.random() * 10) + "";
    }
    console.log(veso);
}
console.log("Tong=" + tong);

