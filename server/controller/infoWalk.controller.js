const InfoWalk = require("../models/infoWalk");

const getWalk = async (req, res) => {
  console.log('getWalk')
  const id = req.params.id;
  try {
    const walk = await InfoWalk.find({_id: id});
    res.status(200);
    res.send(walk);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error to find walk');
  }
}

const getAllWalks = async (req, res) => {
  console.log('getAllWalks')
  try {
    const allWalks = await InfoWalk.find({});
    res.status(200);
    res.send(allWalks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error to find walks');
  }
}

const postWalk = async (req, res) => {
  console.log('postWalk')
  const walk = {
		name: req.body.name,
		date: req.body.date,
		venue: req.body.venue,
		records: {
			pee: false,
			poo: false,
		},
		image: null,
		coordinates: [41.395017,2.197883],
	};
  try {
    const newWalk = await InfoWalk.create(walk);
    res.status(201).json(newWalk);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error to create a new walk');
  }
}

const deleteWalk = async (req, res) => {
  console.log('deleteWalk')
  const id = req.params.id;

  try {
    const walk = await InfoWalk.findByIdAndDelete(id);
    if (!walk) {
      return res.status(404).send('Walk not found');
    }
    return res.status(200).json(id);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error deleting walk');
  }
}

const updateWalk = async (req, res) => {
  console.log('updateWalk')
  const id = req.params.id;
  console.log(id);
  console.log(req.body.records)

  try {
    const walk = await InfoWalk.findByIdAndUpdate(id, {
      $set: {
        records: {
          pee: req.body.records.pee,
          poo: req.body.records.poo
        },
        image: req.body.image,
        coordinates: req.body.coordinates
      }
    }, { new: true });

    if (!walk) {
      return res.status(404).send('Walk not found');
    }

    return res.status(200).send(walk);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error updating walk');
  }

}


module.exports = { getWalk, getAllWalks, postWalk, deleteWalk, updateWalk};
