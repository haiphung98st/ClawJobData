using System;

namespace GoldTracker.Application.DTOs
{
    public class PortfolioTransactionDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string GoldType { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public decimal PricePerTael { get; set; }
        public DateTime Date { get; set; }
        public string Notes { get; set; } = string.Empty;
    }

    public class CreateTransactionDto
    {
        public Guid? ProviderId { get; set; }
        public string Type { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string GoldType { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public decimal PricePerTael { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Notes { get; set; } = string.Empty;
    }

    public class PortfolioSummaryDto
    {
        public decimal TotalValue { get; set; }
        public decimal TotalInvested { get; set; }
        public decimal TotalProfit { get; set; }
        public decimal ProfitPercentage { get; set; }
    }
}
