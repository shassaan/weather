//event listeners

document.querySelector("#btnSearch").addEventListener("click",e => {
    
    let el = document.querySelector("#cityName");

    if(el.value === "" || el.value === null){
        alert("Please provide city name");
    }else{
        loadingStart(e);
        fetch(`https://openweathermap.org/data/2.5/weather?q=${el.value}&appid=b6907d289e10d714a6e88b30761fae22`)
        .then(res => {
       if(res.ok){
            res
            .json()
            .then(data => {
                showResultOnUi(data);
                    loadingEnd(e);
                
            });
        }
       
    })
    .catch(err =>{
        alert("no Record Found");
         loadingEnd(e);
    });
    }
});





const loadingStart  = (e) =>{
    let el = document.querySelector("#"+e.target.id);

    el.setAttribute("disabled","disabled");

    el.textContent = "Searching....";
}


const loadingEnd  = (e) =>{
    let el = document.querySelector("#"+e.target.id);

    //el.setAttribute("disabled","disabled");

    el.removeAttribute("disabled");

    el.textContent = "Search";
}

const showResultOnUi = (rawData) => {
    let html = `<hr>
            <article class="container">
            <div class="row">
                <div class="col-sm-2">
                    <img src="http://openweathermap.org/img/wn/${rawData.weather[0].icon}@2x.png" alt="image">
                </div>

                <div class="col-sm-10">
                    <table>
                        <tr>
                            <td><a href="https://openweathermap.org/city/${rawData.id}" style="color: darkorange;font-weight: 600;">${rawData.name},${rawData.sys.country}</a> <img width="50" height="50" src="https://www.countryflags.io/${rawData.sys.country}/shiny/64.png"> <h6 style="font-style: italic;display: inline;font-weight: 700;">${rawData.weather[0].description}</h6></td>
                        </tr>
                        <tr>
                            <td><p class="badge badge-secondary">${rawData.main.temp} &deg;C</p><span> Temperature from ${rawData.main.temp_min} to ${rawData.main.temp_max} °С, wind ${rawData.wind.speed} m/s. clouds ${rawData.clouds.all} %, ${rawData.main.pressure} hpa</span></td>
                            
                        </tr>

                        <tr>
                            <td>
                            Geo Cords <span><a href="https://openweathermap.org/weathermap?zoom=12&lat=${rawData.coord.lat}&lon=${rawData.coord.lon}" style="color: darkorange;">[${rawData.coord.lon},${rawData.coord.lat}]</a></span>

                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </article>
        <hr>
    `;


    document.querySelector("#resultArea").innerHTML = html;
}