using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoldTracker.Application.DTOs;
using GoldTracker.Application.Interfaces;
using GoldTracker.Application.Interfaces.Repositories;

namespace GoldTracker.Application.Services
{
    public class GoldPriceService : IGoldPriceService
    {
        private readonly IGoldProviderRepository _providerRepository;
        private readonly IGoldPriceRepository _priceRepository;
        private readonly IGoldPriceHistoryRepository _historyRepository;

        public GoldPriceService(
            IGoldProviderRepository providerRepository,
            IGoldPriceRepository priceRepository,
            IGoldPriceHistoryRepository historyRepository)
        {
            _providerRepository = providerRepository;
            _priceRepository = priceRepository;
            _historyRepository = historyRepository;
        }

        public Task<WorldPriceDto> GetWorldPriceAsync()
        {
            // Usually fetched from an external API (like Metals-API) and cached
            return Task.FromResult(new WorldPriceDto
            {
                Price = 2478.50m,
                Change = 12.40m,
                ChangePercent = 0.50m
            });
        }

        public async Task<IEnumerable<GoldProviderDto>> GetProvidersAsync()
        {
            var providers = await _providerRepository.GetAllAsync();
            return providers.Select(p => new GoldProviderDto
            {
                Id = p.Id,
                Name = p.Name,
                Code = p.Code
            });
        }

        public async Task<GoldPriceDto> GetProviderPriceAsync(Guid providerId)
        {
            var price = await _priceRepository.GetLatestByProviderIdAsync(providerId);
            if (price == null) throw new Exception("Price not found");

            var provider = await _providerRepository.GetByIdAsync(providerId);

            return new GoldPriceDto
            {
                Id = price.Id,
                ProviderId = price.ProviderId,
                ProviderName = provider?.Name ?? "",
                Brand = provider?.Code ?? "",
                BuyPrice = price.BuyPrice,
                SellPrice = price.SellPrice,
                Change = 0, // Need previous price to calculate
                UpdatedAt = price.UpdatedAt
            };
        }

        public async Task<IEnumerable<GoldPriceDto>> GetAllProviderPricesAsync()
        {
            var prices = await _priceRepository.GetAllLatestAsync();
            var providers = await _providerRepository.GetAllAsync();
            
            return prices.Select(p => 
            {
                var provider = providers.FirstOrDefault(x => x.Id == p.ProviderId);
                return new GoldPriceDto
                {
                    Id = p.Id,
                    ProviderId = p.ProviderId,
                    ProviderName = provider?.Name ?? "",
                    Brand = provider?.Code ?? "",
                    BuyPrice = p.BuyPrice,
                    SellPrice = p.SellPrice,
                    UpdatedAt = p.UpdatedAt
                };
            });
        }

        public async Task<IEnumerable<GoldPriceHistoryDto>> GetPriceHistoryAsync(string range)
        {
            // For charting, usually SJC or World price is returned depending on context.
            // Simplified return mock data logic representing history processing.
            var history = new List<GoldPriceHistoryDto>
            {
                new GoldPriceHistoryDto { Time = DateTimeOffset.UtcNow.AddHours(-1).ToUnixTimeSeconds(), Open = 2400, High = 2410, Low = 2390, Close = 2405 }
            };
            return await Task.FromResult(history);
        }
    }
}
