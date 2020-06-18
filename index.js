// Importar dependencias
const axios = require('axios')
const blessed = require('blessed')
const contrib = require('blessed-contrib')

// Definir función asíncrona para realizar la petición a la API
async function main() {
  // Realizar petición
  console.log('Obteniendo datos para México...')
  const response = await axios.get('https://api.covid19api.com/total/country/mexico')
  const data = response.data

  // Crear pantalla
  const screen = blessed.screen()

  // Crear gráfica
  const line = contrib.line(
    {
      style:
      {
        line: "yellow"
        , text: "green"
        , baseline: "black"
      }
      , xLabelPadding: 0
      , xPadding: 0
      , showLegend: true
      , wholeNumbersOnly: false
      , label: 'Casos confirmado de COVID-19 en México'
    })

  // Almacenar datos
  const x = []
  const y = []

  for (let i = 0; i < data.length; i += 1) {
    x.push(data[i].Date)
    y.push(data[i].Confirmed)
  }

  // Mostrar gráfica
  screen.append(line)
  line.setData([{
    title: 'Casos confirmados',
    x,
    y
  }])
  screen.render()
}

// Iniciar programa
main()