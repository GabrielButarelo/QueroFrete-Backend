import express from 'express';

import routeUsers from '../domains/users/routes';

const router = express.Router();

router.use('/login', routeUsers);

module.exports = router;