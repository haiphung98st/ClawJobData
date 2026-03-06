using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using GoldTracker.Application.Interfaces;
using GoldTracker.Application.Interfaces.Repositories;
using GoldTracker.Application.Services;
using GoldTracker.Infrastructure.Auth;
using GoldTracker.Infrastructure.Data;
using GoldTracker.Infrastructure.Repositories;
using GoldTracker.Infrastructure.Workers;
using GoldTracker.Domain.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// --- 1. Database Context ---
// Use SQLite for local development (no SQL Server needed on macOS)
// Switch to UseSqlServer() for production with SQL Server
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
    ?? "Data Source=GoldTracker.db";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(connectionString));

// --- 2. CORS (allow frontend) ---
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

// --- 3. Repositories ---
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IGoldProviderRepository, GoldProviderRepository>();
builder.Services.AddScoped<IGoldPriceRepository, GoldPriceRepository>();
builder.Services.AddScoped<IGoldPriceHistoryRepository, GoldPriceHistoryRepository>();
builder.Services.AddScoped<IPortfolioTransactionRepository, PortfolioTransactionRepository>();

// --- 4. Application Services ---
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IGoldPriceService, GoldPriceService>();
builder.Services.AddScoped<IPortfolioService, PortfolioService>();
builder.Services.AddScoped<IJwtProvider, JwtProvider>();

// --- 5. Background Workers ---
builder.Services.AddHostedService<GoldPriceFetchWorker>();

// --- 6. JWT Authentication ---
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var secretKey = builder.Configuration["JwtOptions:SecretKey"] ?? "super_secret_key_that_is_long_enough_for_hmac_sha256!";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["JwtOptions:Issuer"] ?? "GoldTrackerAPI",
            ValidAudience = builder.Configuration["JwtOptions:Audience"] ?? "GoldTrackerClients",
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
        };
    });

// --- 7. Controllers & Swagger ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "GoldTracker.API", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your valid token in the text input below.\n\nExample: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\""
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

var app = builder.Build();

// --- Seed Gold Providers ---
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();

    if (!db.GoldProviders.Any())
    {
        db.GoldProviders.AddRange(
            new GoldProvider { Name = "SJC", Code = "SJC" },
            new GoldProvider { Name = "PNJ", Code = "PNJ" },
            new GoldProvider { Name = "DOJI", Code = "DOJI" },
            new GoldProvider { Name = "Bao Tin Minh Chau", Code = "BTMC" }
        );
        db.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

