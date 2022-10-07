const ProdukJadiController = require('../controllers/ProdukJadiController');
const router = require('express').Router();

router.get('/', ProdukJadiController.index);



module.exports = router;