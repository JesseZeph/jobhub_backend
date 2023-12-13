const router = require('express').Router();
const bookmarkController =  require('../controllers/bookmarkController');
const {verifyToken, verifyAndAuth, verifyAgent} = require('../middleware/verifyToken');

router.post('/', verifyAndAuth, bookmarkController.createBookmark);

router.post('/:id', verifyAndAuth, bookmarkController.deleteBookmark);

router.post('/', verifyAndAuth, bookmarkController.getAllBookmarks);
router.post('/bookmark/:id', verifyAndAuth, bookmarkController.getBookmark);



module.exports = router;