import express from 'express';
const router = express.Router();

// controller instance
import { GetLoginPage, GetRegisterPage } from '../Controllers/controllers';

/*************************************** AUTHENTICATION ROUTES************************************************/
/* Process the login request */
router.get('/login', GetLoginPage);

/* Process the register request */
router.get('/register', GetRegisterPage);

export default router;
