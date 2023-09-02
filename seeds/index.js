const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/camp-site',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 400; i++) {
        const random500 = Math.floor(Math.random() * 500);
        const price = Math.floor(Math.random() * 4000) + 2000;
        const camp = new Campground({
            //MY USER ID
            author: '64db8ec8b619bd083a29868b',
            location: `${cities[random500].city}, ${cities[random500].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque illum pariatur nostrum voluptates, provident iure dolorum eos incidunt minima praesentium, explicabo cumque dolorem sit ut facilis tempora facere beatae necessitatibus.',
            price,
            geometry: {
                 type: 'Point', 
                 coordinates: [
                    cities[random500].longitude,
                    cities[random500].latitude,
                ] 
            },
            images:[
                {
                  url: 'https://res.cloudinary.com/dp5gvulza/image/upload/v1693146500/CampSite/hjbxab4bng5ocqmkrswd.jpg',  
                  filename: 'CampSite/wsuzxhqcd4objamgmb0m',                
                },
                {
                  url: 'https://res.cloudinary.com/dp5gvulza/image/upload/v1692959584/CampSite/eavulw63v9jgxty0kbs6.jpg',  
                  filename: 'CampSite/wze73yrpn8ruwadrciwz',
                }
              ]      

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})


    
