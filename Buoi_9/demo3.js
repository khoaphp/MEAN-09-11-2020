const NauCom = (a, b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

            var tong = a + b;
            resolve(tong);
            //reject("Hết gạo rồi");

        }, 5000);
    });
}

const DoubleIt = (c)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            c = c * 2;
            if(c>=10){
                resolve(c);
            }else{
                reject("ERROR: Must be smaller 10");
            }
        }, 2000);
    });
}

NauCom(1, 2).then((data)=>{  
    console.log(data);
    DoubleIt(data).then((data2)=>{console.log(data2);}).catch((err2)=>{console.log(err2);});
}).catch((err)=>{ console.log("Nau com error!" + err); });

