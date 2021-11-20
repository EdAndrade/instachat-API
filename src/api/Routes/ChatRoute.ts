import ChatController	from '../Controllers/ChatController';
import { Router }		from 'express';

const router 			= Router();
const chatController	= new ChatController();

router.post('/generate_chat'	, chatController.createChat);
router.post('/start_chat'		, chatController.startChat);

export default router;