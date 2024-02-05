import { Router } from 'express';
import { getUsersById, getUsers, deleteUser, createUser, updateUser } from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUsersById);
router.delete('/:id', deleteUser);
router.post('/', createUser);
router.put('/:id', updateUser);

export default router;