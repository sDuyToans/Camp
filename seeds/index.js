const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seeDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62bab6233e0a1bb4f68a2fdc',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dse168gst/image/upload/v1656610781/YelpCamp/v0oe1hxiahtxmwwngkvd.jpg',
                    filename: 'YelpCamp/v0oe1hxiahtxmwwngkvd',
                },
                {
                    url: 'https://res.cloudinary.com/dse168gst/image/upload/v1656610781/YelpCamp/msd3b54cem2zuadam2o6.jpg',
                    filename: 'YelpCamp/msd3b54cem2zuadam2o6',
                }
            ],
            desciption: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero quas qui tempora tempore obcaecati repellat, ullam eum excepturi dolores, culpa quidem possimus incidunt a. Ut dicta obcaecati quia! Assumenda, fuga!',
            price,
            geometry:  { 
                "type" : "Point", 
                "coordinates" : [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            }
        });
        await camp.save();
    }
}

seeDB().then(() => {
    db.close();
})