//  const k=prompt("how many image u want");
const k = 3;
//mapcreation();
geoapp();


// function mapcreation(){
// let mymap = L.map('mapid').setView([0, 0], 5);
// let marker =L.marker([0, 0]).addTo(mymap);
// let attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// let tileurl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// let tile= L.tileLayer(tileurl, {attribution});

// tile.addTo(mymap);

// }
let mymap = L.map('mapid').setView([0, 0], 1);
let marker = L.marker([0, 0]).addTo(mymap);
let attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

let tileurl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

let tile = L.tileLayer(tileurl, { attribution });

tile.addTo(mymap);


function geoapp() {
    navigator.geolocation.getCurrentPosition(async response => {
        let latitude = response.coords.latitude;  //26.724737 
        let longitude =  response.coords.longitude;  //88.435052
        await mymap.setView([latitude, longitude], 10);

        await marker.setLatLng([latitude, longitude]);

        console.log(latitude,longitude)

        let geoUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=d20be08ae18c4ea1810516d669f17c0d`
        let geoData = await fetch(geoUrl);
        let geoJson = await geoData.json();

        //console.log(geoJson)

        // let city = geoJson['results'][0]['components']['city'];
        let city;
        if(geoJson['results'][0]['components']['city']==String){
            city = geoJson['results'][0]['components']['city'];
            console.log("city")
        }
        else if(geoJson['results'][0]['components']['town']==String){
            city = geoJson['results'][0]['components']['town'];
            console.log("town")
        }
        
        else{
             city = geoJson['results'][0]['components']['village'];
             console.log("village")
        }

        let state = geoJson['results'][0]['components']['state'];
        let country = geoJson['results'][0]['components']['country'];
        let continent = geoJson['results'][0]['components']['continent'];

        document.getElementById("address").innerHTML = `<h1>${city}</h1>
        <h4 >${state}</h4>
        <h5>${country} , ${continent}</h5>
        <p>Latitude : ${latitude.toFixed(2)} &deg <br>
            Longitude : ${longitude.toFixed(2)} &deg
            </P>`

        console.log(city, state, country, continent)

        let unsplasCityUrl = `https://api.unsplash.com/search/photos?per_page=${k}&query=${city}&client_id=VV7Xwqd4dJcZobakbJSpu76rZ9AYFJroxdFvYg1U43Y`;
        let cityRawData = await fetch(unsplasCityUrl);
        let cityJsonData = await cityRawData.json();

        let totalResults = parseInt(cityJsonData['total']);
        let runloop;
        if (k => totalResults) {
            runloop = k;
        }
        else {
            runloop = totalResults;
        }


        // console.log(runloop)

        //console.log(stateJsonData)

        // let objectLenght = Object.keys(stateJsonData).length;   {{this is tha object size finding method}}

        let htmllist = [];

        if (cityJsonData['results'] != "") {

            for (let i = 0; i < runloop; i++) {
                //console.log(stateJsonData['results'][i]['urls']['regular'])
                //let URLs =stateJsonData['results'][i]['urls']['regular'];
                // document.getElementById("result").innerHTML = `<div class="card col-md-3">
                // <img class="card-img-top" src="${stateJsonData['results'][i]['urls']['regular']}" alt="">
                // <div class="card-body">
                //     <h5 class="card-title">Title</h5>
                //     <p class="card-text">Content</p>
                // </div>
                // </div>`
                // let description=stateJsonData['results'][0][description];
                // ['alt_description']
                // htmllist.push(` <div class="card col-md-4 col-sm-12 mt20 " style="height=400px;" >
                //                     <img class="card-img-top  mt-3" height=300px src="${stateJsonData['results'][i]['urls']['small']}">
                //                     <div class="card-body " style="height:100px;overflow-y:auto;">
                //                         <h5 class="card-title ">${stateJsonData['results'][i]['description']}</h5>
                //                         <p class="card-text">${stateJsonData['results'][i]['alt_description']}</p>
                //                     </div>
                //                 </div>`)
                htmllist.push(`<div class="col-md-4 mt20">
				<div class="card " >
					<div class="card-body" style='padding:0px'>
						<img src="${cityJsonData['results'][i]['urls']['small']}" height=280px class="card-img-top">
						<div class="card-body p-2 mt-2 mb-2 ml-3 " style="height:100px;overflow-y:auto;">
                                         <h5 class="card-title" id="image-title">${cityJsonData['results'][i]['description']}</h5>
                                         <p class="card-text ">${cityJsonData['results'][i]['alt_description']}</p>
                                     </div>
						
                        </div>
                    </div>
                </div>`)

            };
            joinHTML = htmllist.join("");
            // console.log(joinHTML)
            document.getElementById("result").innerHTML = joinHTML;
        };


        let unsplasStateUrl = `https://api.unsplash.com/search/photos?per_page=${k}&query=${state}&client_id=VV7Xwqd4dJcZobakbJSpu76rZ9AYFJroxdFvYg1U43Y`;
        let stateRawData = await fetch(unsplasStateUrl);
        let stateJsonData = await stateRawData.json();
        let shtmllist = [];

        for (let i = 0; i < runloop; i++) {
            shtmllist.push(`<div class="col-md-4 mt20">
				<div class="card " >
					<div class="card-body" style='padding:0px'>
						<img src="${stateJsonData['results'][i]['urls']['small']}" height=280px class="card-img-top">
						<div class="card-body p-2 mt-2 mb-2 ml-3 " style="height:100px;overflow-y:auto;">
                                         <h5 class="card-title" id="image-title">${stateJsonData['results'][i]['description']}</h5>
                                         <p class="card-text ">${stateJsonData['results'][i]['alt_description']}</p>
                                     </div>
						
					</div>
				</div>
            </div>`)
        };
        statejoinHTML = shtmllist.join("");
        // console.log(joinHTML)
        document.getElementById("sresult").innerHTML = statejoinHTML;

        let unsplasCountryrUrl = `https://api.unsplash.com/search/photos?per_page=${k}&query=${country}&client_id=VV7Xwqd4dJcZobakbJSpu76rZ9AYFJroxdFvYg1U43Y`;
        let countryRawData = await fetch(unsplasCountryrUrl);
        let countryJsonData = await countryRawData.json();
        let counrtyhtmllist = [];

        for (let i = 0; i < runloop; i++) {
            counrtyhtmllist.push(`<div class="col-md-4 mt20">
				<div class="card " >
					<div class="card-body" style='padding:0px'>
						<img src="${countryJsonData['results'][i]['urls']['small']}" height=280px class="card-img-top">
						<div class="card-body p-2 mt-2 mb-2 ml-3 " style="height:100px;overflow-y:auto;">
                                         <h5 class="card-title" id="image-title">${countryJsonData['results'][i]['description']}</h5>
                                         <p class="card-text ">${countryJsonData['results'][i]['alt_description']}</p>
                                     </div>
						
					</div>
				</div>
            </div>`)
        };
        countryjoinHTML = counrtyhtmllist.join("");
        //console.log(countryjoinHTML)
        document.getElementById("countryresult").innerHTML = countryjoinHTML;




        let unsplasContirUrl = `https://api.unsplash.com/search/photos?per_page=${k}&query=${continent}&client_id=VV7Xwqd4dJcZobakbJSpu76rZ9AYFJroxdFvYg1U43Y`;
        let contiRawData = await fetch(unsplasContirUrl);
        let contiJsonData = await contiRawData.json();
        let contihtmllist = [];

        for (let i = 0; i < runloop; i++) {
            contihtmllist.push(`<div class="col-md-4 mt20">
				<div class="card " >
					<div class="card-body" style='padding:0px'>
						<img src="${contiJsonData['results'][i]['urls']['small']}" height=280px class="card-img-top">
						<div class="card-body p-2 mt-2 mb-2 ml-3 " style="height:100px;overflow-y:auto;">
                                         <h5 class="card-title" id="image-title">${contiJsonData['results'][i]['description']}</h5>
                                         <p class="card-text ">${contiJsonData['results'][i]['alt_description']}</p>
                                     </div>
						
					</div>
				</div>
            </div>`)
        };
        contijoinHTML = contihtmllist.join("");
        //console.log(countryjoinHTML)
        document.getElementById("contiresult").innerHTML = contijoinHTML ;



        // console.log(htmllist);
        // htmllist.forEach(element => {
        //     document.getElementById("result").innerHTML=

        // });

        // for (let i=0; i<4;i++){
        //     // console.log(stateJsonData['results'][i]['urls']['regular'])
        //     document.getElementById("state"+i).src=stateJsonData['results'][i]['urls']['regular'];
        // };

    });

}
