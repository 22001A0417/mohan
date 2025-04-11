const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing : joi.object( {
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("", null),
        destination: joi.string().valid(
            'BeachFront', 'Mountains', 'Castles', 'Camping', 'Farms', 
            'Arctic', 'Iconic Cities', 'Rooms', 'Trending', 'Amazing Pools', 'Boats'
        ).required(),
        nights: joi.number().required().min(1),
    }).required()        
});

module.exports.reviewSchema = joi.object({
    review : joi.object( {
        rating: joi.string().required().min(1).max(5),
        comment: joi.string().required(),
    }).required()        
});