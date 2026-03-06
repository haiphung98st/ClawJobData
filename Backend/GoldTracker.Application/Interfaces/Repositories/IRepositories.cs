using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GoldTracker.Domain.Entities;

namespace GoldTracker.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByEmailAsync(string email);
        Task AddAsync(User user);
    }

    public interface IGoldProviderRepository
    {
        Task<IEnumerable<GoldProvider>> GetAllAsync();
        Task<GoldProvider?> GetByIdAsync(Guid id);
        Task<GoldProvider?> GetByCodeAsync(string code);
    }

    public interface IGoldPriceRepository
    {
        Task<GoldPrice?> GetLatestByProviderIdAsync(Guid providerId);
        Task<IEnumerable<GoldPrice>> GetAllLatestAsync();
        Task AddOrUpdateAsync(GoldPrice price);
    }
    
    public interface IGoldPriceHistoryRepository
    {
        Task<IEnumerable<GoldPriceHistory>> GetByProviderIdAsync(Guid providerId, DateTime from, DateTime to);
        Task AddAsync(GoldPriceHistory history);
    }

    public interface IPortfolioTransactionRepository
    {
        Task<IEnumerable<PortfolioTransaction>> GetByUserIdAsync(Guid userId);
        Task<PortfolioTransaction?> GetByIdAsync(Guid id);
        Task AddAsync(PortfolioTransaction transaction);
        Task UpdateAsync(PortfolioTransaction transaction);
        Task DeleteAsync(PortfolioTransaction transaction);
    }
}
