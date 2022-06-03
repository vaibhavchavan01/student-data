import express from 'express';
import StudentController from '../contrrollers/studentController.js';
const router = express.Router();

router.get('/', StudentController.home); 
router.post('/register', StudentController.register); 
router.post('/login', StudentController.login); 
router.get('/login', StudentController.login); 
router.get('/checkdata', StudentController.checkData); 
router.get('/details', StudentController.getAllDoc); 
router.post('/details', StudentController.createDoc); 
router.get('/edit/:id', StudentController.editAllDoc); 
router.post('/update/:id', StudentController.updateDocById); 
router.post('/delete/:id', StudentController.deleteDocById); 

export default router