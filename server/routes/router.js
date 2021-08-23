const express = require('express')
const route = express.Router()

const services = require('../services/render')
const controller = require('../controller/controller')

/**
 * @description Root Route
 * @method GET /
 */
route.get('/', services.listOffer);

/**
 * @description add offer
 * @method GET /add-offer
 */
route.get('/add-offer', services.addOffer)

route.get('/update-offer', services.updateOffer)

route.get('/offers', services.listOfferPublic)


// API
route.post('/api/offers', controller.create);
route.get('/api/offers', controller.find);
route.put('/api/offers/:id', controller.update);
route.delete('/api/offers/:id', controller.delete);
route.put('/api/offers/status/:id', controller.statusUpdate);


module.exports = route;