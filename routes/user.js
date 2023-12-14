const router = require('express').Router();
const userController =  require('../controllers/userController');
const { verifyToken, verifyAndAuth, verifyAgent } = require('../middleware/verifyToken');

router.put('/', verifyAndAuth, userController.updateUser);
router.get('/', verifyAndAuth, userController.getUser);
router.delete('/', verifyAndAuth, userController.deleteUser); // Updated to use deleteUser
router.post('/skills', verifyAndAuth, userController.addSkills);
router.get('/allSkills', verifyAndAuth, userController.getSkills);
router.delete('/skill/:id', verifyAndAuth, userController.deleteSkill);


router.post('/agents', verifyAndAuth, userController.addAgent);
router.put('/agents/:id', verifyAndAuth, userController.updateAgent);
router.get('/agents/:uid', verifyAndAuth, userController.getAgent);
router.get('/agents', verifyAndAuth, userController.getAgents);

module.exports = router;
