const BahanBakuController = require('../controllers/BahanBakuController');

const router = require('express').Router();

router.get('/', BahanBakuController.index);
router.post('/store', BahanBakuController.store);
// router.get('/(:id)', BahanBakuController.getid);
router.get('/get_id/(:id)', BahanBakuController.get_id);


module.exports = router;