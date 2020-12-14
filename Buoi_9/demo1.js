

NauCom(1);  // PROMISE
AnCom(1);   // 3

function NauCom(time){
    console.log("Đang nau com " + time);
    time = time + 1;
    if(time>5){ return; }
    setTimeout(()=>{
        NauCom(time);
    }, 1000);
}

function AnCom(time){
    console.log("An com " + time);
    time = time + 1;
    if(time>3){ return; }
    setTimeout(()=>{
        AnCom(time);
    }, 1000);
}