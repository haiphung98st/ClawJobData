using System;
using System.Collections.Generic;

namespace GoldTracker.Domain.Entities
{
    public class GoldProvider
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty; // e.g. SJC, PNJ, DOJI
        public bool IsActive { get; set; } = true;
        
        public ICollection<GoldPrice> Prices { get; set; } = new List<GoldPrice>();
    }
}
