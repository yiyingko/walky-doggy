const Express = require('express');
const router = Express.Router();
const infoWalkController = require('./controller/infoWalk.controller');

router.get('/walks/:id', infoWalkController.getWalk);
router.get('/walks/', infoWalkController.getAllWalks);
router.post('/walks/', infoWalkController.postWalk);
router.delete('/walks/:id', infoWalkController.deleteWalk);
router.put('/walks/:id', infoWalkController.updateWalk);

module.exports = router;