var demTeo = 1;
function Teo(){
    if(demTeo<=10){
        console.log("TEO " + demTeo);
        demTeo++;
        setTimeout(()=>{Teo()}, 1000);
    }  
}

var demTi = 1;
function Ti(){
    if(demTi<=10){
        console.log("Ti " + demTi);
        demTi++;
        setTimeout(()=>{Ti()}, 1000);
    }  
}

//  nodejs callback // middleware // PROMISE
Teo();
Ti();

//setTimeout(()=>{console.log("Hello");}, 3000);