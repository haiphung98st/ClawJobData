using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GoldTracker.Application.Interfaces;

namespace GoldTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoldController : ControllerBase
    {
        private readonly IGoldPriceService _goldPriceService;

        public GoldController(IGoldPriceService goldPriceService)
        {
            _goldPriceService = goldPriceService;
        }

        [HttpGet("world-price")]
        public async Task<IActionResult> GetWorldPrice()
        {
            var result = await _goldPriceService.GetWorldPriceAsync();
            return Ok(result);
        }

        [HttpGet("providers")]
        public async Task<IActionResult> GetProviders()
        {
            var result = await _goldPriceService.GetProvidersAsync();
            return Ok(result);
        }

        [HttpGet("providers/{id}/price")]
        public async Task<IActionResult> GetProviderPrice(Guid id)
        {
            try
            {
                var result = await _goldPriceService.GetProviderPriceAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return NotFound(new { Message = ex.Message });
            }
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetHistory([FromQuery] string range = "1D")
        {
            var result = await _goldPriceService.GetPriceHistoryAsync(range);
            return Ok(result);
        }
    }
}
