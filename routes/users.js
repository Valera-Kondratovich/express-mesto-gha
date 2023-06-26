const router = require('express').Router();
const {
  getUserById,
  getUsers,
  updateUser,
  updateAvatarUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
