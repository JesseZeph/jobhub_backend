const router = require('express').Router();
const applyController =  require('../controllers/applyController');
const {verifyAndAuth} = require('../middleware/verifyToken');

router.post('/', verifyAndAuth, applyController.apply);

router.get('/', verifyAndAuth, applyController.getApplyJobs);


module.exports = router;