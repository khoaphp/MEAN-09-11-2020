const NauCom = (a, b)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{

            var tong = a + b;
            resolve(tong);
            //reject("Hết gạo rồi");

        }, 5000);
    });
}

NauCom(3, 5)
.then((data)=>{ console.log("Nau com xong! " + data); })
.catch((err)=>{ console.log("Nau com error!" + err); });

