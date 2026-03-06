using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using GoldTracker.Application.DTOs;

namespace GoldTracker.Application.Interfaces
{
    public interface IPortfolioService
    {
        Task<IEnumerable<PortfolioTransactionDto>> GetTransactionsAsync(Guid userId);
        Task<PortfolioTransactionDto> AddTransactionAsync(Guid userId, CreateTransactionDto dto);
        Task<PortfolioTransactionDto> UpdateTransactionAsync(Guid userId, Guid transactionId, CreateTransactionDto dto);
        Task DeleteTransactionAsync(Guid userId, Guid transactionId);
        Task<PortfolioSummaryDto> GetSummaryAsync(Guid userId);
    }
}
