import express from 'express';
import {
  create,
  getUser
} from './controller';
const router = express.Router();

router.get('/', getUser);
router.post('/create', create);

module.exports = router;