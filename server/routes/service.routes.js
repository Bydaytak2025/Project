const express = require('express'); 
const { 
    applyConsulting, processPayment, locationMarkrtAnalysis, salesRevenueOptimization, financialPlanningService, 
    consultancyService, getFullService, getApplicationStatus, updateApplication, updatePaymentStatus, getServiceTest 
} = require('../controllers/service.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.use(VerifyToken);

router.get('/test_service', getServiceTest);

router.post('/add', applyConsulting);
 
router.post('/payment', processPayment); 

router.post('/location-markrt-analysis', locationMarkrtAnalysis);

router.post('/sales-revenue-optimization', salesRevenueOptimization);

router.post('/financial-planning-service', financialPlanningService);

router.post('/consultancy', consultancyService);

router.post('/getfullservice', getFullService);

router.get('/getstatus/:id', getApplicationStatus);

router.put('/service/update/:id', updateApplication);

router.put('/update/paymentstatus/:id', updatePaymentStatus);

module.exports = router;