import { Router } from "express";
import { getTransactions, exportTransactionsCSV, downloadInvoices } from "../controllers/admin/transactionAdminController.js";
import { getBusinessAccounts, getUserAccounts, getBusinessDetails, getUserDetails } from "../controllers/admin/accountAdminController.js";
import { getDashboardData } from "../controllers/admin/dashboardAdminController.js";
import manualVerifyBusiness from "../controllers/admin/ManualVerification.js";
import { getCharityData, updateCharityItem, deleteCharityItem } from "../controllers/admin/adminCharityManagement.controller.js";
import { addCharityContent } from "../controllers/admin/addCharityContent.controller.js";
import { adminAuthMiddleware } from "../middleware/isAuthenticated.js";
import multer from 'multer';
import path from 'path';

const router = Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

// Manual verification route
router.post('/manual-verification', adminAuthMiddleware, manualVerifyBusiness);

// Transaction routes
router.get('/transactions', adminAuthMiddleware, getTransactions);
router.get('/transactions/export', adminAuthMiddleware, exportTransactionsCSV);
router.get('/transactions/invoices', adminAuthMiddleware, downloadInvoices);

// Account routes
router.get('/business-accounts', adminAuthMiddleware, getBusinessAccounts);
router.get('/user-accounts', adminAuthMiddleware, getUserAccounts);
router.get('/business-accounts/:businessId', adminAuthMiddleware, getBusinessDetails);
router.get('/user-accounts/:userId', adminAuthMiddleware, getUserDetails);

// Dashboard route
router.get('/dashboard', adminAuthMiddleware, getDashboardData);

// Charity management routes
router.get('/charity', adminAuthMiddleware, getCharityData);
router.put('/charity/:type/:id', adminAuthMiddleware, upload.single('file'), updateCharityItem);
router.delete('/charity/:type/:id', adminAuthMiddleware, deleteCharityItem);
router.post('/charity/:type', adminAuthMiddleware, upload.single('file'), addCharityContent);

export default router;

