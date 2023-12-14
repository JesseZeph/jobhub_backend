const router = require('express').Router();
const userController =  require('../controllers/userController');
const {verifyToken, verifyAndAuth, verifyAgent} = require('../middleware/verifyToken');


router.put('/', verifyAndAuth, userController.updateUser);
router.get('/', verifyAndAuth, userController.getUser);
router.get('/:id', verifyAndAuth, userController.deleteUser);
router.post('/skills', verifyAndAuth, userController.addSkills);
router.get('/skills', verifyAndAuth, userController.getSkills);
router.delete('/skill/:id', verifyAndAuth, userController.deleteSkill);






module.exports = router;