const InfoWalk = require("../models/infoWalk");

const getWalk = async (req, res) => {
  console.log('getWalk')
}

const getAllWalks = async (req, res) => [
  console.log('getAllWalks')
]

const postWalk = async (req, res) => {
  console.log('postWalk')
}

const deleteWalk = async (req, res) => {
  console.log('deleteWalk')
}

const updateWalk = async (req, res) => {
  console.log('updateWalk')
}


module.exports = { getWalk, getAllWalks, postWalk, deleteWalk, updateWalk};
