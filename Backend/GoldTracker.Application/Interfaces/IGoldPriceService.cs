using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GoldTracker.Application.DTOs;

namespace GoldTracker.Application.Interfaces
{
    public interface IGoldPriceService
    {
        Task<WorldPriceDto> GetWorldPriceAsync();
        Task<IEnumerable<GoldProviderDto>> GetProvidersAsync();
        Task<GoldPriceDto> GetProviderPriceAsync(Guid providerId);
        Task<IEnumerable<GoldPriceDto>> GetAllProviderPricesAsync();
        Task<IEnumerable<GoldPriceHistoryDto>> GetPriceHistoryAsync(string range);
    }
}
