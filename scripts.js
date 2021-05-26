// Joseph Brantley, 5/13/21
document.getElementById("submitBtn").addEventListener('click', function(){
    isValid = true
    document.getElementById("errZ").innerHTML = ("")
    var str = document.getElementById('zCode').value
    //this filters for acceptable zipcode
    var patt = /(^\d{5}$)|(^\d{5}-\d{4}$)/
    //checks if valid
    var result = str.match(patt)
    if (document.getElementById('zCode').value == "" || result == null){
        isValid = false
        document.getElementById("errZ").innerHTML = ("please enter valid 5 digit zip code")
    }
    else {
        //create var for api data
        httpRequest = new XMLHttpRequest;
        //get the data
        var units = ""
        if(document.getElementById('far').checked == true){
            units = "imperial"
        }
        else{
            units = "metric"
        }
        var zip = document.getElementById('zCode').value
        httpRequest.open("get", "http://api.openweathermap.org/data/2.5/weather?zip="+ zip +",us&appid=513439210d80a4c37333e159f4a35aa9&units=" + units)
        httpRequest.send()
        //run when the data is recieved
        httpRequest.onreadystatechange = aFunction;
    }
})

        
    function aFunction()
    {
        //makes sure the connection was successful before continuing
        if(httpRequest.readyState == 4 && httpRequest.status == 200)
        {
            //clear the content and make the recieves content readable
            document.getElementById("hand").innerHTML=("")
            var dog = httpRequest.responseText
            dogObj = JSON.parse(dog)
            var icon = dogObj.weather[0].icon
            var img = "http://openweathermap.org/img/wn/" +  icon + "@2x.png"
            var name = dogObj.name
            var loc = dogObj.weather[0].main
            var temp = dogObj.main.temp
    
            //create the card
            var card = document.createElement('div')
            card.innerHTML = ("<div class='card style='width: 18r'em;'><div class = 'row'><div class='col'><img class ='icon' src='" + img + "' alt='Card image cap'></div><div class='col'><div class='card-body'><h2 class='card-title'>" + name + "</h2><h2 class='card-text'>" + loc + "</h2><h1 class='card-text'>" + temp + "</h1></div></div>'")
            document.getElementById('hand').appendChild(card);
        }
    }
