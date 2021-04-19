import express from 'express';
import { LoginHandler, RegisterHandler } from './../controllers/auth.controller';

const router = express.Router();

router.post('/login', LoginHandler);
router.post('/register', RegisterHandler);

module.exports = router;