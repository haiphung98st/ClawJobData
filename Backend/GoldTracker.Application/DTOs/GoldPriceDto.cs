using System;

namespace GoldTracker.Application.DTOs
{
    public class GoldProviderDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
    }

    public class GoldPriceDto
    {
        public Guid Id { get; set; }
        public Guid ProviderId { get; set; }
        public string ProviderName { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public decimal BuyPrice { get; set; }
        public decimal SellPrice { get; set; }
        public decimal Change { get; set; }
        public DateTime UpdatedAt { get; set; }
    }

    public class WorldPriceDto
    {
        public decimal Price { get; set; }
        public decimal Change { get; set; }
        public decimal ChangePercent { get; set; }
    }
    
    public class GoldPriceHistoryDto
    {
        public long Time { get; set; } // Unix timestamp
        public decimal Open { get; set; }
        public decimal High { get; set; }
        public decimal Low { get; set; }
        public decimal Close { get; set; }
    }
}
