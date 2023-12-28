const Contact = require('../models/Contact');
const _ = require("lodash");
const queryCreator = require("../commonHelpers/queryCreator");

exports.leaveContact = (req, res, next) => {
  const fields = _.cloneDeep(req.body);

  const contactData = new Contact(fields)
  contactData
    .save()
    .then(product => res.json(product))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
}

exports.getContactRequests = (req, res, next) => {
  Contact.find()
    .then(requests => {
      res.status(200).send(requests)
    }).catch(err =>
      res.status(500).json({
        message: `Error happened on server: "${err}" `
      })
    );
}

exports.updateContactRequests = (req, res, next) => {
  Contact.findOne({ _id: req.params.id })
    .then(contact => {
      if (!contact) {
        return res.status(400).json({
          message: `Contact with _id "${req.params.id}" is not found.`
        });
      } else {
        const contactData = _.cloneDeep(req.body);
        const updatedContact = queryCreator(contactData);

        Contact.findOneAndUpdate(
          { _id: req.params.id },
          { $set: updatedContact },
          { new: true }
        )
          .populate("product")
          .populate("category")
          .populate("customer")
          .then(contact => {
            Contact.find()
              .then(requests => {
                res.status(200).send(requests)
              }).catch(err =>
                res.status(500).json({
                  message: `Error happened on server: "${err}" `
                })
              );
          })
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
}

exports.deleteContactRequests = (req, res, next) => {
  Contact.findOne({ _id: req.params.id })
    .then(async contact => {
      if (!contact) {
        return res.status(400).json({
          message: `Contact with id "${req.params.id}" is not found.`
        });
      } else {
        const contactToDelete = await Contact.findOne({
          _id: req.params.id
        });

        Contact.deleteOne({ _id: req.params.id })
          .then(deletedCount =>
            Contact.find()
              .then(requests => {
                res.status(200).send(requests)
              }).catch(err =>
                res.status(500).json({
                  message: `Error happened on server: "${err}" `
                })
              )
          )
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    });
}