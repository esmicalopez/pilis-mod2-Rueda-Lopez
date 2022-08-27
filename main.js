/*API CLIMA*/
window.addEventListener('load', ()=> {
    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')  
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')  
    
    let ubicacion = document.getElementById('ubicacion')  
    let iconoAnimado = document.getElementById('icono-animado') 


    if(navigator.geolocation){
       navigator.geolocation.getCurrentPosition( posicion => {
           //console.log(posicion.coords.latitude)
           lon = posicion.coords.longitude
           lat = posicion.coords.latitude
          
           //ubicación por ciudad
           const url = `https://api.openweathermap.org/data/2.5/weather?q=San Salvador de Jujuy&lang=es&units=metric&appid=5f0c72c86f59e565414cbf9999f820df`

           //console.log(url)

           fetch(url)
            .then( response => { return response.json()})
            .then( data => {
                //console.log(data)
                
                let temp = Math.round(data.main.temp)
                //console.log(temp)
                temperaturaValor.textContent = `${temp} ° C`

                //console.log(data.weather[0].description)
                let desc = data.weather[0].description
                temperaturaDescripcion.textContent = desc.toUpperCase()
                ubicacion.textContent = data.name
                
                //para iconos estáticos
                //const urlIcon = `http://openweathermap.org/img/wn/${iconCode}.png`                     
                //icono.src = urlIcon
                //console.log(data.weather[0].icon)

                //para iconos dinámicos
                console.log(data.weather[0].main)
                switch (data.weather[0].main) {
                    case 'Thunderstorm':
                      iconoAnimado.src='./assets/clima/thunder.svg'
                      console.log('Tormenta');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='./assets/clima/rainy-2.svg'
                      console.log('Llovizna');
                      break;
                    case 'Rain':
                      iconoAnimado.src='./assets/clima/rainy-7.svg'
                      console.log('Lluvia');
                      break;
                    case 'Snow':
                      iconoAnimado.src='./assets/clima/snowy-6.svg'
                        console.log('Nieve');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src='./assets/clima/day.svg'
                        console.log('Limpio');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='./assets/clima/weather.svg'
                        console.log('Atmosfera');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='./assets/clima/cloudy-day-1.svg'
                        console.log('Nubes');
                        break;  
                    default:
                      iconoAnimado.src='./assets/clima/cloudy-day-1.svg'
                      console.log('por defecto');
                  }

            })
            .catch( error => {
                console.log(error)
            })
       })
          
    }
})
/*FORMULARIO*/

// FORMULARIO
function onClick (event) {
  event.preventDefault();
  
  const mensaje = {
    name: document.getElementById('comercio').value,
    email: document.getElementById('titular').value,
    message: document.getElementById('celular').value
  }

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(mensaje),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => { 
        console.log(json);
        Swal.fire(
            'Formulario enviado, muchas gracias',
            'En breve nos contactaremos con usted', 
            'success'
        );
        cleanForm();
    })
    .catch((err) => console.log(err));
  
  console.log('antes de la promesa...');
  let promise = new Promise(function(resolve, reject){
      setTimeout(() => resolve(), 5000);
      const getValueInput = () => {
          let inputValue1 = document.querySelector("#comercio").value;
          let inputValue2 = document.querySelector("#titular").value; 
          let inputValue3 = document.querySelector("#celular").value;               
      };
  })
  .then(resp => {
      console.log('termino el timeout');
  });
  console.log('despues de la promesa');
}

function cleanForm() {
    let formulario = document.getElementById('formulario');    
    formulario.reset();    
}
function redirectUrl(){
    window.location.href = "https://google.com";    
}

let boton = document.getElementById("enviar");
  boton.addEventListener("click", onClick);

// Capturar valores de los inputs
const getValueInput = () => {
  let inputValue1 = document.querySelector("#comercio").value;
  let inputValue2 = document.querySelector("#titular").value; 
  let inputValue3 = document.querySelector("#celular").value;       
  console.log(inputValue1);
  console.log(inputValue2);
  console.log(inputValue3);
};  