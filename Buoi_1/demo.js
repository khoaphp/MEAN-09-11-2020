// biến
var hoten = "Teo Nguyen";
var namsinh = "2010";
namsinh = parseInt(namsinh);
var tuoi = 2020 - namsinh;

// Hàm: if, for, while
if(tuoi >= 18){
    console.log("Ban du tuoi roi");
}else{
    console.log("Ban chua du tuoi");
}

for(var n=0; n<5; n=n+1){
    console.log("Line number " + n);
}

var m=1;
while(m<=3){
    console.log("M = " + m);
    m = m + 1;
}

// Mảng  i=  0    1    2    3
var mang = ["A", "B", "C", "D"];
mang.forEach(function(caigicungdc){
    console.log( caigicungdc );
});

var danhsach = [
    new HocSinh("Trong", 1995), 
    new HocSinh("Tuan", 2000), 
    new HocSinh("Nam", 1998)
];

danhsach.forEach((hocsinh)=>{
    console.log(hocsinh.HOTEN);
});

function HocSinh(hoten, namsinhoan){ 
    this.HOTEN = hoten;
    this.NAMSINH = namsinh;
}

