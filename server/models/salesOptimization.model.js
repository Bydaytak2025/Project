const mongoose = require("mongoose");

const salesOptimizationSchema = new mongoose.Schema({
  BusinessName: { type: String, required: true },
  costPrice: { type: Number, required: true },
  competitorPrice: { type: Number },
  profitMargin: { type: Number }, // in %
  suggestedPrice: { type: Number },
  estimatedSales: { type: Number },
  estimatedRevenue: { type: Number },
  targetAudience: { type: String },
  pricingStrategy: { type: String, enum: ['cost-based', 'competitor-based', 'custom'] },
  createdAt: { type: Date, default: Date.now }
});

// Auto-calculate fields before saving
salesOptimizationSchema.pre("save", function (next) {
  if (this.pricingStrategy === 'cost-based' && this.profitMargin) {
    this.suggestedPrice = this.costPrice + (this.costPrice * (this.profitMargin / 100));
  } else if (this.pricingStrategy === 'competitor-based' && this.competitorPrice) {
    this.suggestedPrice = this.competitorPrice;
  }

  if (this.estimatedSales && this.suggestedPrice) {
    this.estimatedRevenue = this.estimatedSales * this.suggestedPrice;
  }

  next();
});

module.exports = mongoose.model("SalesOptimization", salesOptimizationSchema);
