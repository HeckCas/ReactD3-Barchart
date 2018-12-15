class generaDatos {

  data = [
   {"name": "Aguascalientes",  "idh": this.generateRandom() },
   {"name": "Baja California",  "idh": this.generateRandom() },
   {"name": "Baja California Sur",  "idh": this.generateRandom() },
   {"name": "Campeche",  "idh": this.generateRandom() },
   {"name": "CDMX ",  "idh": this.generateRandom() },
   {"name": "Chiapas", "idh": this.generateRandom() },
   {"name": "Chihuahua", "idh": this.generateRandom() },
   {"name": "Coahuila",  "idh": this.generateRandom() },
   {"name": "Colima",  "idh": this.generateRandom() },
   {"name": "Durango",  "idh": this.generateRandom() },
   {"name": "Estado de México",  "idh": this.generateRandom() },
   {"name": "Guanajuato",  "idh": this.generateRandom() },
   {"name": "Guerrero", "idh": this.generateRandom() },
   {"name": "Hidalgo", "idh": this.generateRandom() },
   {"name": "Jalisco",  "idh": this.generateRandom() },
   {"name": "Michoacan",  "idh": this.generateRandom() },
   {"name": "Morelos",  "idh": this.generateRandom() },
   {"name": "Nayarit",  "idh": this.generateRandom() },
   {"name": "Nuevo Leon", "idh": this.generateRandom() },
   {"name": "Oaxaca", "idh": this.generateRandom() },
   {"name": "Puebla",  "idh": this.generateRandom() },
   {"name": "Queretaro",  "idh": this.generateRandom() },
   {"name": "Quintana Roo",  "idh": this.generateRandom() },
   {"name": "San Luis Potosí",  "idh": this.generateRandom() },
   {"name": "Sinaloa", "idh": this.generateRandom() },
   {"name": "Sonora", "idh": this.generateRandom() },
   {"name": "Tabasco",  "idh": this.generateRandom() },
   {"name": "Tamaulipas",  "idh": this.generateRandom() },
   {"name": "Tlaxcala",  "idh": this.generateRandom() },
   {"name": "Veracruz",  "idh": this.generateRandom() },
   {"name": "Yucatán", "idh": this.generateRandom() },
   {"name": "Zacatecas", "idh": this.generateRandom() },
  ]

     generateRandom() {
       return Math.random();
     }
}

export default data
