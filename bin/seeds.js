require('dotenv').config();

const mongoose = require('mongoose')
const App = require('../models/App')

mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  
const apps = []

function seedApps(num) {
  for (let i = 1; i <= num; i++) {
    if (i < 10) {
      let number = "00" + String(i)
      apps.push({
        id: i,
        name: `my-app-${number}`,
        })
    }
    if (i >= 10 && i < 100) {
      let number = "0" + String(i)
      apps.push({
        id: i,
        name: `my-app-${number}`,
        })
    }
    if (i === 100) {
      number = "100"
      apps.push({
        id: i,
        name: `my-app-${number}`,
        })
    }
  }
}

seedApps(100);


App.insertMany(apps).then(apps => {
  apps.forEach(app => {
    console.log(app.name)
  })
    mongoose.connection.close();
 }).catch(error =>{
   console.log(error);
 })



