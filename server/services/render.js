const axios = require('axios')
exports.listOffer = (req, res) => {
    axios.get("http://localhost:3000/api/offers")
        .then(response => {
            // console.log(response)
            res.render('index', {
                offers: response.data
            })
        })
        .catch(err => {
            res.send(err)
        })

}

exports.addOffer = (req, res) => {
    res.render('add_offer');
}


exports.updateOffer = (req, res) => {
    axios.get("http://localhost:3000/api/offers", { params: { id: req.query.id } })
    .then(response => {
        // console.log(response)
        res.render('update_offer', {
            offer: response.data
        });
        
    })
    .catch(err => {
        res.send(err)
    })
    
}


exports.listOfferPublic = (req, res) => {
    axios.get("http://localhost:3000/api/offers", { params: { disabled: false,  } })
    .then(response => {
        // console.log(response)
        res.render('offers_public', {
            offers: response.data
        });
        
    })
    .catch(err => {
        res.send(err)
    })
    
}