import express from 'express';
import { adminLogin, adminLogout, getallServices, getallUsers } from "../controllers/admin.js"
import { adminAuth } from '../middleware/adminAuth.js';
import { deleteService } from '../controllers/service.js';

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);
router.get("/get-services",adminAuth, getallServices);
router.get("/get-users", adminAuth, getallUsers);
router.post("/service/:id", adminAuth, deleteService);


export default router