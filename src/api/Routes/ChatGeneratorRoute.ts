import ChatGeneratorController	from '../Controllers/ChatGeneratorController';
import { Router }				from 'express';

const router 					= Router();
const chatGeneratorController	= new ChatGeneratorController();

router.post('/generate_code'	, chatGeneratorController.generateChat);

export default router;