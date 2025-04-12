const paymentService = require('../services/payment.service');

const getServiceTest = async (req, res) =>{
    res.send("service route works");
}
const applyConsulting = async (req, res) => {
    res.send("Application for consulting submitted");
};

const processPayment = async (req, res) => { 
    try {
        await paymentService(req).then(res => {
            if(res.ok) return res.json();
        }).then(({ url }) => window.location = url);
    } catch (error) {
        console.error("payment error");
    }
};

const marketingStrategyService = async (req, res) => {
    res.send("marketingStrategyService applied");
};

const marketAnalysisService  = async (req, res) => {
    res.send("marketAnalysisService applied");
};

const financialPlanningService  = async (req, res) => {
    res.send("financialPlanningService applied");
};

const locationOptimizationService  = async (req, res) => {
    res.send("locationOptimizationService applied");
}; 

const getFullService = async (req, res) => {
    res.send("Full service document requested");
};

const getApplicationStatus = async (req, res) => {
    res.send(`Application status for ID ${req.params.id}`);
};

const updateApplication = async (req, res) => {
    res.send(`Application ${req.params.id} updated`);
};

const updatePaymentStatus = async (req, res) => {
    res.send(`Payment status for ${req.params.id} updated`);
};

module.exports = { 
    applyConsulting, processPayment, marketingStrategyService, marketAnalysisService, financialPlanningService, getServiceTest,
    locationOptimizationService, getFullService, getApplicationStatus, updateApplication, updatePaymentStatus 
}; 