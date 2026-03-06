using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GoldTracker.Application.DTOs;
using GoldTracker.Application.Interfaces;

namespace GoldTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PortfolioController : ControllerBase
    {
        private readonly IPortfolioService _portfolioService;

        public PortfolioController(IPortfolioService portfolioService)
        {
            _portfolioService = portfolioService;
        }

        private Guid GetUserId()
        {
            var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdStr) || !Guid.TryParse(userIdStr, out var userId))
                throw new UnauthorizedAccessException("Invalid User ID");
            return userId;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactions()
        {
            var transactions = await _portfolioService.GetTransactionsAsync(GetUserId());
            return Ok(transactions);
        }

        [HttpPost]
        public async Task<IActionResult> AddTransaction([FromBody] CreateTransactionDto dto)
        {
            var transaction = await _portfolioService.AddTransactionAsync(GetUserId(), dto);
            return Ok(transaction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(Guid id, [FromBody] CreateTransactionDto dto)
        {
            try
            {
                var transaction = await _portfolioService.UpdateTransactionAsync(GetUserId(), id, dto);
                return Ok(transaction);
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(Guid id)
        {
            try
            {
                await _portfolioService.DeleteTransactionAsync(GetUserId(), id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
        }

        [HttpGet("profit-loss")]
        public async Task<IActionResult> GetProfitLoss()
        {
            var summary = await _portfolioService.GetSummaryAsync(GetUserId());
            return Ok(summary);
        }
    }
}
