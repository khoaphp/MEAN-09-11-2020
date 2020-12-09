var mangA = [];

for(x=1; x<=1000; x++){
    mangA.push("a" + x);
}

mangA.forEach(function(a){
    console.log(a);
});

var mangB = [];

for(x=1; x<=1000; x++){
    mangB.push("b" + x);
}

mangB.forEach(function(b){
    console.log(b);
});

/*
var mangB = ["b1", "b2"];
var mangC = ["c1", "c2", "c3"];

mangA.forEach(function(a){
    console.log(a);
});

mangB.forEach(function(b){
    console.log(b);
});

mangC.forEach(function(c){
    console.log(c);
});

*/