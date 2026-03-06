using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using GoldTracker.Application.Interfaces.Repositories;
using GoldTracker.Domain.Entities;

namespace GoldTracker.Infrastructure.Workers
{
    public class GoldPriceFetchWorker : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<GoldPriceFetchWorker> _logger;
        private readonly TimeSpan _fetchInterval = TimeSpan.FromMinutes(5);

        public GoldPriceFetchWorker(IServiceProvider serviceProvider, ILogger<GoldPriceFetchWorker> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Fetching fresh gold prices at: {time}", DateTimeOffset.Now);

                try
                {
                    using var scope = _serviceProvider.CreateScope();
                    var providerRepo = scope.ServiceProvider.GetRequiredService<IGoldProviderRepository>();
                    var priceRepo = scope.ServiceProvider.GetRequiredService<IGoldPriceRepository>();
                    var historyRepo = scope.ServiceProvider.GetRequiredService<IGoldPriceHistoryRepository>();

                    var providers = await providerRepo.GetAllAsync();
                    foreach (var provider in providers)
                    {
                        // Simulate scraping logic (e.g. HTTP call to DOJI, SJC)
                        decimal mockBuy = 80000000 + new Random().Next(-50000, 50000);
                        decimal mockSell = mockBuy + 2000000;

                        var newPrice = new GoldPrice
                        {
                            ProviderId = provider.Id,
                            BuyPrice = mockBuy,
                            SellPrice = mockSell,
                            UpdatedAt = DateTime.UtcNow
                        };

                        await priceRepo.AddOrUpdateAsync(newPrice);

                        var history = new GoldPriceHistory
                        {
                            ProviderId = provider.Id,
                            BuyPrice = mockBuy,
                            SellPrice = mockSell,
                            Timestamp = DateTime.UtcNow
                        };
                        await historyRepo.AddAsync(history);
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error fetching gold prices");
                }

                await Task.Delay(_fetchInterval, stoppingToken);
            }
        }
    }
}
