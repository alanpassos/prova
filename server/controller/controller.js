var Offerdb = require('../model/model')
const moment = require('moment')

validateData = (data) => {

    if(!data.ends_at){
        data.disabled = false
        return data
    }
    
    let disabled = true;
    
    const now = new Date() 
    const dataStarts= moment(data.starts_at, "DD/MM/YYYY HH:mm").toDate() 
    const dataEnds= moment(data.ends_at, "DD/MM/YYYY HH:mm").toDate() 
    
    if(now >= dataStarts && now < dataEnds){
        disabled = false;
    }else{
        disabled = true;
    }

    data.disabled = disabled;

    return data
}

// create and save offer
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }
    let dataValidate = validateData(req.body);
    dataValidate.premium = dataValidate.premium === 'on'
    

    const offer = Offerdb(dataValidate);
    offer
        .save(offer)
        .then(data => {
            // res.send(data);
            res.redirect('/add-offer')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurrend while creating a create operation'
            });
        });

}

// retrive and return all offers/ retrive and return a single offer
exports.find = (req, res) => {
    if (req.query.id) {
        const id = req.query.id;
        Offerdb.findById(id)
            // .where('disabled').equals(false)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Not found offer id ${id}`
                    });

                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: `Erro retrieving offer with id ${id}`
                });
            });

    } else {
        Offerdb.find()
            .sort({ 'premium': -1 })
            .where(req.query)
            .then(offer => {
                res.send(offer)

            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error occurrend while retriving user information"
                });
            });
    }
}

// Update a new idetified offer by offer id
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400)
            .send({ message: "Data can not be empty" });
        return;
    }
    const id = req.params.id;
    const dataValidate = validateData(req.body);
    Offerdb.findByIdAndUpdate(id, dataValidate, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Cannot Update offer with ${id}. Maybe offer not found.`
                })
            } else {
                res.send(data);
                // res.redirect('/update-offer')
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error update offer information"
            });
        });

}


// Delete a offer with specified offer id
exports.delete = (req, res) => {
    const id = req.params.id;

    Offerdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Cannot Delete with ${id}. Maybe id is wrong.`
                })
            } else {
                res.send({ message: "Offer was deleted successfully" });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || `Cloud not delete Offer with id=${id}`
            });
        });

}


exports.statusUpdate = (req, res) => {
    if (!req.body) {
        res.status(400)
            .send({ message: "Data can not be empty" });
        return;
    }
    const id = req.params.id;
    Offerdb.findByIdAndUpdate(id, { disabled: req.body.disabled }, { useFindAndModify: false, new: true })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: `Cannot Update offer with ${id}. Maybe offer not found.`
                })
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error update offer information"
            });
        });

}