using System;

namespace GoldTracker.Domain.Entities
{
    public class GoldPrice
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid ProviderId { get; set; }
        public GoldProvider Provider { get; set; } = null!;
        public decimal BuyPrice { get; set; }
        public decimal SellPrice { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
