using System;
using System.Threading.Tasks;
using GoldTracker.Application.DTOs;

namespace GoldTracker.Application.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);
        Task<AuthResponseDto> LoginAsync(LoginDto dto);
    }
}
