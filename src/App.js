import React, { Component } from 'react';
import './index.css';
import BarChart from './BarChart';
import { Dropdown } from './Dropdown';


  let states = ['Aguascalientes','Baja California','Baja California Sur','Campeche','Chiapas','Chihuahua','CDMX','Coahuila','Colima','Durango','Estado de México',
  'Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
  'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];

  let statesAbv = ['AGU','BCN','BCS','CAM','CHP','CHH','CMX','COA','COL','DUR','MEX',
  'GUA','GRO','HID','JAL','MIC','MOR','NAY','NLE','OAX','PUE','QUE','ROO','SLP','SIN','SON',
  'TAB','TAM','TLA','VER','YUC','ZAC'];

  let years = ['1994','1995','1996','1997','1998','1999','2000'];
  let tipoOrdenamiento = ['Alfabéticamente','Ascendente','Descendente'];

class App extends Component {
  constructor(props) {
    super(props);
    let dataset = this.generateData();
    this.state = {
       data : [
         {"name": "Aguascalientes",  "idh": this.generateRandom(), color: false },
         {"name": "Baja California",  "idh": this.generateRandom(), color: false },
         {"name": "Baja California Sur",  "idh": this.generateRandom(), color: false },
         {"name": "Campeche",  "idh": this.generateRandom(), color: false },
         {"name": "CDMX",  "idh": this.generateRandom(), color: false },
         {"name": "Chiapas", "idh": this.generateRandom(), color: false },
         {"name": "Chihuahua", "idh": this.generateRandom(), color: false },
         {"name": "Coahuila",  "idh": this.generateRandom(), color: false },
         {"name": "Colima",  "idh": this.generateRandom(), color: false },
         {"name": "Durango",  "idh": this.generateRandom(), color: false },
         {"name": "Estado de México",  "idh": this.generateRandom(), color: false },
         {"name": "Guanajuato",  "idh": this.generateRandom(), color: false },
         {"name": "Guerrero", "idh": this.generateRandom(), color: false },
         {"name": "Hidalgo", "idh": this.generateRandom(), color: false },
         {"name": "Jalisco",  "idh": this.generateRandom(), color: false },
         {"name": "Michoacan",  "idh": this.generateRandom(), color: false },
         {"name": "Morelos",  "idh": this.generateRandom(), color: false },
         {"name": "Nayarit",  "idh": this.generateRandom(), color: false },
         {"name": "Nuevo Leon", "idh": this.generateRandom(), color: false },
         {"name": "Oaxaca", "idh": this.generateRandom(), color: false },
         {"name": "Puebla",  "idh": this.generateRandom(), color: false },
         {"name": "Queretaro",  "idh": this.generateRandom(), color: false },
         {"name": "Quintana Roo",  "idh": this.generateRandom(), color: false },
         {"name": "San Luis Potosí",  "idh": this.generateRandom(), color: false },
         {"name": "Sinaloa", "idh": this.generateRandom(), color: false },
         {"name": "Sonora", "idh": this.generateRandom(), color: false },
         {"name": "Tabasco",  "idh": this.generateRandom(), color: false },
         {"name": "Tamaulipas",  "idh": this.generateRandom(), color: false },
         {"name": "Tlaxcala",  "idh": this.generateRandom(), color: false },
         {"name": "Veracruz",  "idh": this.generateRandom(), color: false },
         {"name": "Yucatán", "idh": this.generateRandom(), color: false },
         {"name": "Zacatecas", "idh": this.generateRandom(), color: false },
       ],
       otraData: dataset,
       value: '',
  }

   }
   generateRandom() {
     return Math.random();

   }

  generateData() {
    let allData = [];
    for (let f = 0; f < years.length; f++){
      let chartData = [];
      // ['estado-abrv', 'estado-comple' ,idh]
      for (let c = 0; c < states.length; c++) {
        chartData.push([
          statesAbv[c],
          states[c],
          Math.random()
      ]);
      }
      // { { year : 'año1' , idh : Array(32) } , { year : 'año2' } }
        allData.push({
        year: years[f],
        idh: chartData
      });
    }
    console.log(allData);
    return allData;
  }

  getValue(newValue) {
    this.setState({ value: newValue })
  }

   render() {
       this.generateData();
       console.log(this.state.value)
    return (
      <div className="wrapper">
        <div id="d3-content">
          <Dropdown onChange={ this.getValue } data={ states }/>
          <Dropdown onChange={ this.getValue } data={ years }/>
          <Dropdown onChange={ this.getValue } data={ tipoOrdenamiento }/>
          <BarChart data={ this.state.data } value={ this.state.value }/>
          <h1>{ this.state.value }</h1>
        </div>
    </div>
    );
  }
}
export default App;
