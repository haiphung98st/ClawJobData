using System;

namespace GoldTracker.Domain.Entities
{
    public class PortfolioTransaction
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
        public Guid? ProviderId { get; set; }
        public GoldProvider? Provider { get; set; }
        
        // Buy or Sell
        public string Type { get; set; } = string.Empty;
        
        public string Brand { get; set; } = string.Empty; // SJC, PNJ...
        public string GoldType { get; set; } = string.Empty; // Ring, Bar...
        
        public decimal Quantity { get; set; }
        public decimal PricePerTael { get; set; }
        
        public DateTime TransactionDate { get; set; }
        public string Notes { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
