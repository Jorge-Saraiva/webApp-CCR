import { Router } from 'express';
import { getPlacesById, getPlaces, deletePlace, createPlace, updatePlace } from '../controllers/place.controller';

const router = Router();

router.get('/', getPlaces);
router.get('/:id', getPlacesById);
router.delete('/:id', deletePlace);
router.post('/', createPlace);
router.put('/:id', updatePlace);

export default router;