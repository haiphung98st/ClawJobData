using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using GoldTracker.Application.DTOs;
using GoldTracker.Application.Interfaces;
using GoldTracker.Application.Interfaces.Repositories;
using GoldTracker.Domain.Entities;

namespace GoldTracker.Application.Services
{
    public interface IJwtProvider
    {
        string GenerateToken(User user);
    }

    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtProvider _jwtProvider;

        public AuthService(IUserRepository userRepository, IJwtProvider jwtProvider)
        {
            _userRepository = userRepository;
            _jwtProvider = jwtProvider;
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto dto)
        {
            var existingUser = await _userRepository.GetByEmailAsync(dto.Email);
            if (existingUser != null)
                throw new Exception("Email already exists");

            var user = new User
            {
                Email = dto.Email,
                FullName = dto.FullName,
                PasswordHash = HashPassword(dto.Password)
            };

            await _userRepository.AddAsync(user);

            return new AuthResponseDto
            {
                Token = _jwtProvider.GenerateToken(user),
                UserId = user.Id,
                Email = user.Email,
                FullName = user.FullName
            };
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);
            if (user == null || !VerifyPassword(dto.Password, user.PasswordHash))
                throw new Exception("Invalid credentials");

            return new AuthResponseDto
            {
                Token = _jwtProvider.GenerateToken(user),
                UserId = user.Id,
                Email = user.Email,
                FullName = user.FullName
            };
        }

        private string HashPassword(string password)
        {
            // Simple hash for demonstration. Use BCrypt or PBKDF2 in production.
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        private bool VerifyPassword(string password, string hash)
        {
            return HashPassword(password) == hash;
        }
    }
}
