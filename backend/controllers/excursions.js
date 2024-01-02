const Excursion = require("../models/Excursion");
const queryCreator = require("../commonHelpers/queryCreator");
const sendMail = require("../commonHelpers/mailSender");
const _ = require("lodash");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dyjwpccso',
  api_key: '535722222753226',
  api_secret: 'ZAkkqjUsrURXMeMnqCVJeK4zyrw',
});

exports.getExcursions = (req, res, next) => {
  Excursion.find()
    .then(excursions => res.status(200).json(excursions))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.reserveExcursion = (req, res, next) => {
  Excursion.findOne({ title: req.params.title })
    .then(excursion => {
      if (!excursion) {
        return res
          .status(400)
          .json({
            message: `Excursion with title "${req.params.title}" is not found.`
          });
      } else {
        const initialQuery = _.cloneDeep(req.body);
        const updatedReservation = queryCreator(initialQuery);
        const { title, ...reservation } = updatedReservation;

        const subscriberMail = req.body.email;
        const letterSubject = req.body.letterSubject;
        const letterHtml = req.body.letterHtml;

        if (!letterSubject) {
          return res.status(400).json({
            message:
              "This operation involves sending a letter to the client. Please provide field 'letterSubject' for the letter."
          });
        }

        if (!letterHtml) {
          return res.status(400).json({
            message:
              "This operation involves sending a letter to the client. Please provide field 'letterHtml' for the letter."
          });
        }

        Excursion.findOneAndUpdate(
          { title: req.params.title },
          { $push: { reservations: { $each: [reservation] } } },
          { new: true }
        )
          .then(async excursion => {
            const mailResult = await sendMail(
              subscriberMail,
              letterSubject,
              letterHtml,
              res
            );

            res.json({ excursion, mailResult });
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
};

exports.uploadExcursionImg = (req, res, next) => {
  Excursion.findOne({ _id: req.params.id })
    .then(async excursion => {
      if (!excursion) {
        return res
          .status(400)
          .json({
            message: `Excursion with title "${req.params.id}" is not found.`
          });
      } else {
        try {
          const result = await cloudinary.uploader.upload(req.file.path);
          const initialQuery = _.cloneDeep(req.body);
          initialQuery.imageURL = result.url;
          const updatedExcursion = queryCreator(initialQuery);

          Excursion.findOneAndUpdate(
            { _id: req.params.id },
            { $set: updatedExcursion },
            { new: true }
          )
            .then(excursion => {
              res.status(200).send(excursion)
            })
            .catch(err =>
              res.status(400).json({
                message: `Error happened on server: "${err}" `
              })
            );

        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error uploading image' });
        }
      }
    })
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.addExcursion = (req, res, next) => {
  const excursionFields = _.cloneDeep(req.body);

  const updatedExcursion = queryCreator(excursionFields);

  const newExcursion = new Excursion(updatedExcursion);

  newExcursion
    .save()
    .then(excursion => res.json(excursion))
    .catch(err =>
      res.status(400).json({
        message: `Error happened on server: "${err}" `
      })
    );
};

exports.deleteExcursion = (req, res, next) => {
  Excursion.findOne({ _id: req.params.id })
    .then(async excursion => {
      if (!excursion) {
        return res
          .status(400)
          .json({ message: `Excursion with _id "${req.params.id}" is not found.` });
      } else {
        const excursionToDelete = await Excursion.findOne({ _id: req.params.id });

        Excursion.deleteOne({ _id: req.params.id })
          .then(deletedCount => {
            res.status(200).send(excursionToDelete)
          })
          .catch(err =>
            res.status(400).json({
              message: `Error happened on server: "${err}" `
            })
          );
      }
    });
};
