const API_KEY = "502f58a07a40125a9779e2fea8ea9bf0&units=imperial";
const generateButton = document.querySelector("#generate");

generateButton.addEventListener("click" , (event)=>{
    // get the data from the client side
    let feelings = document.querySelector("#feelings").value;
    let zipCode = document.querySelector("#zip").value;
    getWeatherData("https://api.openweathermap.org/data/2.5/weather?zip="+zipCode+"&appid="+API_KEY)
        .then((data)=> {
            data.feelings = feelings;
            let today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            data.date = today;
            store("/store", data)
                .then(()=>getAppData("/data"));
        });
});
async function store(url="",data={})
{
    const response = await fetch(url, {
        method: "post",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try{
    }catch (error){
        console.log("error: ",error);
    }
}
async function getWeatherData(url="")
{
    const response = await fetch(url,{
        method: "get",
        credentials: "same-origin",
    });
    try{
        return  await response.json()

    }catch (error){
        console.log("error",error);
    }
}
async function getAppData(url="")
{
    const response = await fetch(url,{
        method: "get",
        credentials: "same-origin",
    });
    try{
        const Data = await response.json()
        document.getElementById('temp').innerHTML = Math.round(Data.temp)+ ' degrees';
        document.getElementById('content').innerHTML = Data.feelings;
        document.getElementById("date").innerHTML = Data.date;

    }catch (error){
        console.log("error",error);
    }
}
// getWeatherData("http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid="+API_KEY);
// getAppData("/data");
// getWeatherData().then(getUIData().then(store().then(getData())))