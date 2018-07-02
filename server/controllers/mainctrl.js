const axios = require("axios");
const breedsUrl = "https://dog.ceo/api/breeds/list/all";
const name_genUrl = "https://ghibliapi.herokuapp.com/people";

let breedslist = [];
let genders = [];
let owners = [];
var status = ["Active", "Active", "Active", "Not Active", "Active", "Active"];

const receivebreeds = (req, res, next) => {
  breedslist = [];
  copyDB = [];
  axios.get(breedsUrl).then(results => {
    for (x in results.data.message) {
      copyDB.push(x);
    }
    copyDB.splice(0, 80);
    breedslist = copyDB;
    res.status(200).send(breedslist);
  });
};
const receiveowners = (req, res, next) => {
  axios.get(name_genUrl).then(results => {
    owners = results.data.map((e, i) => e.name).splice(1, 6);
    res.status(200).send(owners);
  });
};

const receivegenders = (req, res, next) => {
  axios.get(name_genUrl).then(results => {
    genders = results.data.map((e, i) => e.gender).slice(1, 7);
    res.status(200).send(genders);
  });
};

const statuses = (req, res, next) => {
  res.status(200).send(status);
};

const createOwner = (req, res, next) => {
  owners.push(req.body.owner);
  res.status(200).send(owners);
};

const updateStatus = (req, res, next) => {
  let updateMe = status.findIndex((e, i) => req.params.i == i);
  console.log(req.body.changedstatus);
  status[updateMe] = req.body.changedstatus;
  res.status(200).send(status);
};

const deletedbreed = (req, res, next) => {
  // let deleteMe = breedslist.findIndex((e, i) => req.params.i == i);
  breedslist.splice(+req.params.i, 1);
  res.status(200).send(breedslist);
};
const deletedowner = (req, res, next) => {
  console.log({ owners, query: req.query.i });
  // let deleteMe = owners.findIndex((e, i) => req.query.i == i);
  owners.splice(+req.params.i, 1);
  console.log({ owners });
  res.status(200).send(owners);
};
const deletedgender = (req, res, next) => {
  // let deleteMe = genders.findIndex((e, i) => req.query.i == i);
  genders.splice(+req.query.i, 1);
  res.status(200).send(genders);
};
const deletedstatus = (req, res, next) => {
  // let deleteMe = status.findIndex((e, i) => req.query.i == i);
  status.splice(+req.query.i, 1);
  res.status(200).send(status);
};

module.exports = {
  receivebreeds,
  receiveowners,
  receivegenders,
  statuses,
  createOwner,
  updateStatus,
  deletedbreed,
  deletedgender,
  deletedowner,
  deletedstatus
};
