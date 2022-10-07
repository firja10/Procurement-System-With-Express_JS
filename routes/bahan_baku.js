const BahanBakuController = require('../controllers/BahanBakuController');

const router = require('express').Router();

router.get('/', BahanBakuController.index);
router.post('/store', BahanBakuController.store);
// router.get('/(:id)', BahanBakuController.getid);
router.get('/get_id/(:id)', BahanBakuController.get_id);

// router.put('/update', BahanBakuController.updateData);
router.post('/update/:id', BahanBakuController.updateData);

// router.post('/delete/:id', BahanBakuController.deleteData);

router.get('/delete/(:id)', BahanBakuController.deleteData);


module.exports = router;