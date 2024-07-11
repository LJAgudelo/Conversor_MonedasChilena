
// URL de la API
const urlApiMonedas = "https://mindicador.cl/api/";
let datos;
// consulta de la API
async function getApiMoneda(){
    try {
        const prom = await fetch(urlApiMonedas);
        datos = await prom.json();
        return datos;
    } catch (error) {
        alert(`ocurrcio un error de tipo ${error.message}`);
        
    }

}

async function renderMoneda(){
    try {
        const valorEntra = document.querySelector('#valor').value;
        const modenaSelect = document.querySelector('#monedas').value;
        const monedas = await getApiMoneda();
        const valorConvertido = valorEntra/datos[modenaSelect].valor;
    
    document.querySelector('#resultado').textContent=`El resultado es: ${valorConvertido.toFixed(4)}`;
    } catch (error) {
        
    }
    

}

document.querySelector('#enviar').addEventListener('click', renderMoneda);


// para la grafica

async function getMonedas() {
    const endpoint = "https://mindicador.cl/api/";
    const res = await fetch(endpoint);
    const monedas = await res.json();
    return monedas;
}
function prepararConfiguracionParaLaGrafica(monedas) {
    const tipoDeGrafica = "line";
    const nombresDeLasMonedas = monedas.map((moneda) => moneda.codigo);
    const titulo = "Valor Monedas";
    const colorDeLinea = "blue";
    const valores = monedas.map((moneda) => {
        const valor = moneda.Valor.replace(",", ".");
        return Number(valor);
    });
    
    const config = {
        type: tipoDeGrafica,
        data: {
            labels: nombresDeLasMonedas,
            datasets: [
                {
                    label: titulo, 
                    backgroundColor: colorDeLinea,
                    data: valores
                }
            ]
        }
    };
     return config;
    }

    async function renderGrafica() {
        try {
            const monedas = await getMonedas();
            const config = prepararConfiguracionParaLaGrafica(monedas);
            const chartDOM = document.getElementById("myChart");
            new Chart(chartDOM, config);
        } catch (error) {
            alert.error(error.message);
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        renderGrafica();
    });