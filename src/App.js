import React, { Component } from 'react';
import { BarChart } from './BarChart';
import { Card } from './Card';
import './index.css';

  let states = ['Aguascalientes','Baja California','Baja california Sur','Campeche','Cdmx','Chiapas','Chihuahua','Coahuila','Colima','Durango','Estado de México',
  'Guanajuato','Guerrero','Hidalgo','Jalisco','Michoacán','Morelos','Nayarit','Nuevo León','Oaxaca','Puebla','Querétaro','Quintana Roo','San Luis Potosí','Sinaloa','Sonora',
  'Tabasco','Tamaulipas','Tlaxcala','Veracruz','Yucatán','Zacatecas'];
  let statesAbv = ['AGU','BCN','BCS','CAM','CHP','CHH','CMX','COA','COL','DUR','MEX',
  'GUA','GRO','HID','JAL','MIC','MOR','NAY','NLE','OAX','PUE','QUE','ROO','SLP','SIN','SON',
  'TAB','TAM','TLA','VER','YUC','ZAC'];
  let years = ['1994','1995','1996','1997','1998','1999','2000'];
  let tipoOrdenamiento = ['Alfabéticamente','Ascendente','Descendente'];
  let ocuspocus = [];

export class App extends Component {

  constructor(props) {
    super(props);
    let dataset = this.generateData();
    this.state = {
       otraData: dataset,
       año : '1994',
       estado: 'Aguascalientes',
       orden: 'Alfabéticamente',
       yearToSelect: 0,
       idhProm: '0',
       idhMax: '0',
       idhMin: '0',
    }
    this.handleChangeYear = this.handleChangeYear.bind(this);
    this.handleChangeEstado = this.handleChangeEstado.bind(this);
    this.handleChangeOrden = this.handleChangeOrden.bind(this);
    this.dataReductor = this.dataReductor.bind(this);
    this.generateDataCard = this.generateDataCard.bind(this);
  }

  generateData() {
    let datasetComplete = [];
    for (let f = 0; f < years.length; f++) {
      let datasetAux = [];
      for (let c = 0; c < states.length; c++) {
        datasetAux.push([
          statesAbv[c],
          states[c],
          Math.random()
      ]);
      }
        datasetComplete.push({
        year: years[f],
        idh: datasetAux
      });

    }
    return datasetComplete;
  }

  dataReductor() {
    const realData = [];
      for(let i = 0; i < 32; i++) {
        realData.push([
          this.state.otraData[this.state.yearToSelect].idh[i][1],
          this.state.otraData[this.state.yearToSelect].idh[i][2],
          this.state.otraData[this.state.yearToSelect].idh[i][1] === this.state.estado ? true : false
        ]);
      }
      return realData;

  }

  handleChangeYear(e) {
    const yearValue = e.target.value;
    this.setState({ año: yearValue });
    const yearSelected = this.findYearIndex(yearValue);
    this.setState({ yearToSelect: yearSelected });
    this.generateDataCard(yearSelected);
  }

  findYearIndex(yearValue){
    for (let i = 0; i < this.state.otraData.length; i++){
      if(this.state.otraData[i].year === yearValue ){
        return i;
      }
    }
  }
  
  handleChangeEstado(e) {
    const estadoValue = e.target.value;
    this.setState({ estado: estadoValue });
  }

  handleChangeOrden(e) {
    const ordenValue = e.target.value;
    this.setState({ orden: ordenValue });
    
  }

  generateDataCard(yearSelected){
      //Obtener el promedio de todos los IDH
      let promIDH = 0;
      for(let i = 0; i < this.state.otraData[yearSelected].idh.length; i++){
        promIDH += this.state.otraData[yearSelected].idh[i][2]; // Suma todos los IDH de un año determinado
      }
      promIDH = (promIDH / 32);
      let promIDHstr = promIDH.toFixed(2);
      //IDH más alto
      this.state.otraData[yearSelected].idh.sort(function(a, b){return b[2] > a[2] ? 1 : -1}); 
      let IDHmax = this.state.otraData[yearSelected].idh[1][2].toFixed(2);
      //IDH más bajo
      this.state.otraData[yearSelected].idh.sort(function(a, b){return a[2] > b[2] ? 1 : -1});
      let IDHmin = this.state.otraData[yearSelected].idh[1][2].toFixed(2);
      this.setState({ idhProm: promIDHstr, idhMax: IDHmax, idhMin: IDHmin })
    }

  render() {
    ocuspocus = this.dataReductor();
    return (
      <div className="wrapper">
        <div id="d3-content">
          {/*Dropdown de Año*/}
          <select className='menu' onChange={ this.handleChangeYear }>
            {years.map(n => <option key={ n } value={ n }>{ n }</option>)}
          </select>
          {/*Dropdown de Estado*/}
          <select className='menu' onChange={ this.handleChangeEstado }>
            {states.map(n => <option key={ n } value={ n }>{ n }</option>)}
          </select>
          {/*Dropdown de Orden*/}
          <select className='menu' onChange={ this.handleChangeOrden }>
            {tipoOrdenamiento.map(n => <option key={ n } value={ n }>{ n }</option>)}
          </select>
          {/* Componente Barchart con sus respectivos props*/}
          <BarChart data={ ocuspocus } orden={ this.state.orden }/>
          {/* Componente Card con sus respectivos props*/}
        </div>
        <Card year={ this.state.año } prom={ this.state.idhProm } max={ this.state.idhMax } min={ this.state.idhMin }/>
      </div>
    );
  }
}
