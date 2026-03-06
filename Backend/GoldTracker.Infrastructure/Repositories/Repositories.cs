using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using GoldTracker.Application.Interfaces.Repositories;
using GoldTracker.Domain.Entities;
using GoldTracker.Infrastructure.Data;

namespace GoldTracker.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task AddAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
    }

    public class GoldProviderRepository : IGoldProviderRepository
    {
        private readonly AppDbContext _context;

        public GoldProviderRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GoldProvider>> GetAllAsync()
        {
            return await _context.GoldProviders.Where(p => p.IsActive).ToListAsync();
        }

        public async Task<GoldProvider?> GetByIdAsync(Guid id)
        {
            return await _context.GoldProviders.FindAsync(id);
        }

        public async Task<GoldProvider?> GetByCodeAsync(string code)
        {
            return await _context.GoldProviders.FirstOrDefaultAsync(p => p.Code == code);
        }
    }

    public class GoldPriceRepository : IGoldPriceRepository
    {
        private readonly AppDbContext _context;

        public GoldPriceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<GoldPrice?> GetLatestByProviderIdAsync(Guid providerId)
        {
            return await _context.GoldPrices
                .FirstOrDefaultAsync(p => p.ProviderId == providerId);
        }

        public async Task<IEnumerable<GoldPrice>> GetAllLatestAsync()
        {
            return await _context.GoldPrices.ToListAsync();
        }

        public async Task AddOrUpdateAsync(GoldPrice price)
        {
            var existing = await _context.GoldPrices.FirstOrDefaultAsync(p => p.ProviderId == price.ProviderId);
            if (existing != null)
            {
                existing.BuyPrice = price.BuyPrice;
                existing.SellPrice = price.SellPrice;
                existing.UpdatedAt = DateTime.UtcNow;
                _context.GoldPrices.Update(existing);
            }
            else
            {
                _context.GoldPrices.Add(price);
            }
            await _context.SaveChangesAsync();
        }
    }
    
    public class GoldPriceHistoryRepository : IGoldPriceHistoryRepository
    {
        private readonly AppDbContext _context;

        public GoldPriceHistoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<GoldPriceHistory>> GetByProviderIdAsync(Guid providerId, DateTime from, DateTime to)
        {
            return await _context.GoldPriceHistory
                .Where(h => h.ProviderId == providerId && h.Timestamp >= from && h.Timestamp <= to)
                .OrderBy(h => h.Timestamp)
                .ToListAsync();
        }

        public async Task AddAsync(GoldPriceHistory history)
        {
            _context.GoldPriceHistory.Add(history);
            await _context.SaveChangesAsync();
        }
    }

    public class PortfolioTransactionRepository : IPortfolioTransactionRepository
    {
        private readonly AppDbContext _context;

        public PortfolioTransactionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PortfolioTransaction>> GetByUserIdAsync(Guid userId)
        {
            return await _context.Transactions
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.TransactionDate)
                .ToListAsync();
        }

        public async Task<PortfolioTransaction?> GetByIdAsync(Guid id)
        {
            return await _context.Transactions.FindAsync(id);
        }

        public async Task AddAsync(PortfolioTransaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(PortfolioTransaction transaction)
        {
            _context.Transactions.Update(transaction);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(PortfolioTransaction transaction)
        {
            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();
        }
    }
}
