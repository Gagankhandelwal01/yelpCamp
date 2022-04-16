const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)]


const seedDB = async() => {
    await Campground.deleteMany({});
    for(i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60f8466dfd43361880a9bcba',
            location : `${cities[random1000].city}, ${cities[random1000].state}`,
            title : `${sample(descriptors)} ${sample(places)}`,
            description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt corporis non laboriosam provident aperiam praesentium quod laudantium explicabo quos reprehenderit pariatur, quam, eos architecto repellendus animi corrupti veritatis soluta dolor!',
            price,
            geometry: { 
                type: 'Point',
                coordinates: [ 
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                 ] 
            },
            images:  [
                {
                  url: 'https://res.cloudinary.com/dwckw1qak/image/upload/v1628861662/YelpCamp/cchsonupklugomdvcuqp.jpg',
                  filename: 'YelpCamp/cchsonupklugomdvcuqp'
                },
                {
                  url: 'https://res.cloudinary.com/dwckw1qak/image/upload/v1628861670/YelpCamp/efixfwatnol5iqp50zsb.jpg',
                  filename: 'YelpCamp/efixfwatnol5iqp50zsb'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})