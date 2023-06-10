const router = require('express').Router();
const {
  getUserById,
  createUser,
  getUsers,
  updateUser,
  updateAvatarUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
