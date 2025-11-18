import { Router } from 'express';
import {
  getPaises,
  getPais,
  createPais,
  updatePais,
  deletePais,
  getPaisesPorContinente,
  getPaisInfo,
  getPaisInfoByName
} from '../controllers/paisController';

const router = Router();

router.get('/', getPaises);
router.get('/:id', getPais);
router.post('/', createPais);
router.put('/:id', updatePais);
router.delete('/:id', deletePais);
router.get('/continente/:id', getPaisesPorContinente);
router.get('/:id/info', getPaisInfo);
router.get('/info/nome/:nome', getPaisInfoByName);

export default router;