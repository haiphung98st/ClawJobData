using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GoldTracker.Application.DTOs;
using GoldTracker.Application.Interfaces;
using GoldTracker.Application.Interfaces.Repositories;
using GoldTracker.Domain.Entities;

namespace GoldTracker.Application.Services
{
    public class PortfolioService : IPortfolioService
    {
        private readonly IPortfolioTransactionRepository _transactionRepository;
        private readonly IGoldPriceService _goldPriceService;

        public PortfolioService(IPortfolioTransactionRepository transactionRepository, IGoldPriceService goldPriceService)
        {
            _transactionRepository = transactionRepository;
            _goldPriceService = goldPriceService;
        }

        public async Task<IEnumerable<PortfolioTransactionDto>> GetTransactionsAsync(Guid userId)
        {
            var transactions = await _transactionRepository.GetByUserIdAsync(userId);
            return transactions.Select(t => new PortfolioTransactionDto
            {
                Id = t.Id,
                Type = t.Type,
                Brand = t.Brand,
                GoldType = t.GoldType,
                Quantity = t.Quantity,
                PricePerTael = t.PricePerTael,
                Date = t.TransactionDate,
                Notes = t.Notes
            });
        }

        public async Task<PortfolioTransactionDto> AddTransactionAsync(Guid userId, CreateTransactionDto dto)
        {
            var transaction = new PortfolioTransaction
            {
                UserId = userId,
                ProviderId = dto.ProviderId,
                Type = dto.Type,
                Brand = dto.Brand,
                GoldType = dto.GoldType,
                Quantity = dto.Quantity,
                PricePerTael = dto.PricePerTael,
                TransactionDate = dto.TransactionDate,
                Notes = dto.Notes
            };

            await _transactionRepository.AddAsync(transaction);

            return new PortfolioTransactionDto
            {
                Id = transaction.Id,
                Type = transaction.Type,
                Brand = transaction.Brand,
                GoldType = transaction.GoldType,
                Quantity = transaction.Quantity,
                PricePerTael = transaction.PricePerTael,
                Date = transaction.TransactionDate,
                Notes = transaction.Notes
            };
        }

        public async Task<PortfolioTransactionDto> UpdateTransactionAsync(Guid userId, Guid transactionId, CreateTransactionDto dto)
        {
            var transaction = await _transactionRepository.GetByIdAsync(transactionId);
            if (transaction == null || transaction.UserId != userId)
                throw new Exception("Transaction not found");

            transaction.ProviderId = dto.ProviderId;
            transaction.Type = dto.Type;
            transaction.Brand = dto.Brand;
            transaction.GoldType = dto.GoldType;
            transaction.Quantity = dto.Quantity;
            transaction.PricePerTael = dto.PricePerTael;
            transaction.TransactionDate = dto.TransactionDate;
            transaction.Notes = dto.Notes;

            await _transactionRepository.UpdateAsync(transaction);

            return new PortfolioTransactionDto
            {
                Id = transaction.Id,
                Type = transaction.Type,
                Brand = transaction.Brand,
                GoldType = transaction.GoldType,
                Quantity = transaction.Quantity,
                PricePerTael = transaction.PricePerTael,
                Date = transaction.TransactionDate,
                Notes = transaction.Notes
            };
        }

        public async Task DeleteTransactionAsync(Guid userId, Guid transactionId)
        {
            var transaction = await _transactionRepository.GetByIdAsync(transactionId);
            if (transaction == null || transaction.UserId != userId)
                throw new Exception("Transaction not found");

            await _transactionRepository.DeleteAsync(transaction);
        }

        public async Task<PortfolioSummaryDto> GetSummaryAsync(Guid userId)
        {
            var transactions = await _transactionRepository.GetByUserIdAsync(userId);
            var currentPrices = await _goldPriceService.GetAllProviderPricesAsync();

            decimal totalInvested = 0;
            decimal totalValue = 0;

            foreach (var txn in transactions)
            {
                if (txn.Type.Equals("Buy", StringComparison.OrdinalIgnoreCase))
                {
                    totalInvested += txn.Quantity * txn.PricePerTael;
                    
                    var currentPrice = currentPrices.FirstOrDefault(p => p.Brand == txn.Brand)?.BuyPrice ?? txn.PricePerTael;
                    totalValue += txn.Quantity * currentPrice;
                }
                // Handle Sell logic here if needed
            }

            decimal profit = totalValue - totalInvested;
            decimal percentage = totalInvested > 0 ? (profit / totalInvested) * 100 : 0;

            return new PortfolioSummaryDto
            {
                TotalInvested = totalInvested,
                TotalValue = totalValue,
                TotalProfit = profit,
                ProfitPercentage = percentage
            };
        }
    }
}
