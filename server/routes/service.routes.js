const express = require('express'); 
const { 
    applyConsulting, processPayment, marketingStrategyService, marketAnalysisService, financialPlanningService, 
    locationOptimizationService, getFullService, getApplicationStatus, updateApplication, updatePaymentStatus, getServiceTest 
} = require('../controllers/service.controller');
const router = express.Router();
const { VerifyToken } = require('../middlewares/verifyToken'); 

router.use(VerifyToken);

router.get('/test_service', getServiceTest);

router.post('/add', applyConsulting);
 
router.post('/payment', processPayment);

router.post('/marketingStrategyService', marketingStrategyService);

router.post('/marketAnalysisService', marketAnalysisService);

router.post('/financialPlanningService', financialPlanningService);

router.post('/locationOptimizationService', locationOptimizationService);

router.post('/getfullservice', getFullService);

router.get('/getstatus/:id', getApplicationStatus);

router.put('/service/update/:id', updateApplication);

router.put('/update/paymentstatus/:id', updatePaymentStatus);

module.exports = router;