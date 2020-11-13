for(var i=1; i<=10; i++){
    console.log( RandomString(8) );
}

function RandomString(dai){
    var mang = ["A", "B", "C", "D", "a", "b", "c", "d", 1, 2, 3, 4, 5, 6, 7, 8, 9];  
    var ketqua = "";
    for(var n=1; n<=dai; n++){
        var r = Math.floor(Math.random() * mang.length);
        ketqua = ketqua + mang[r];
    }
    return ketqua;
}