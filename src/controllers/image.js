const path = require('path');
const helpers = require('../helpers/libs'); //tdoo el objeto
const { randomName } = require('../helpers/libs'); //sólo la función
const fs = require('fs-extra');

const { Image } = require('../models/index');

const ctrl = {};

ctrl.index = async (req, res) => {
  const image = await Image.findById;
  res.render('image');
};

ctrl.create = async (req, res) => {
  const imageUrl = randomName();
  const imageTempPath = req.file.path;
  const ext = path.extname(req.file.originalname).toLowerCase();
  const targetPath = path.resolve(`src/public/upload/${imageUrl}${ext}`);

  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
    await fs.rename(imageTempPath, targetPath); //mueve imagen
    const newImg = new Image({
      title: req.body.title,
      filename: imageUrl + ext,
      description: req.body.description
    });
    const imageSaved = await newImg.save();
    console.log(imageSaved);
    //--
  } else {
    await fs.unlink(imageTempPath);
    res.status(500).json({ error: 'Only Images are allowed' });
  }
  res.send('it works!');
};

ctrl.like = (req, res) => {};

ctrl.comment = (req, res) => {};

ctrl.remove = (req, res) => {};

module.exports = ctrl;
