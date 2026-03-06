using Microsoft.EntityFrameworkCore;
using GoldTracker.Domain.Entities;

namespace GoldTracker.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<GoldProvider> GoldProviders { get; set; } = null!;
        public DbSet<GoldPrice> GoldPrices { get; set; } = null!;
        public DbSet<GoldPriceHistory> GoldPriceHistory { get; set; } = null!;
        public DbSet<PortfolioTransaction> Transactions { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Users
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
                entity.Property(e => e.FullName).HasMaxLength(150);
            });

            // Gold Providers
            modelBuilder.Entity<GoldProvider>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Code).IsUnique();
                entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Code).IsRequired().HasMaxLength(50);
            });

            // Gold Prices (Latest)
            modelBuilder.Entity<GoldPrice>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.Provider)
                      .WithMany(p => p.Prices)
                      .HasForeignKey(e => e.ProviderId)
                      .OnDelete(DeleteBehavior.Cascade);
                
                entity.Property(e => e.BuyPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.SellPrice).HasColumnType("decimal(18,2)");
            });

            // Gold Price History
            modelBuilder.Entity<GoldPriceHistory>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Timestamp); // Index for time-series queries
                entity.HasOne(e => e.Provider)
                      .WithMany()
                      .HasForeignKey(e => e.ProviderId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.Property(e => e.BuyPrice).HasColumnType("decimal(18,2)");
                entity.Property(e => e.SellPrice).HasColumnType("decimal(18,2)");
            });

            // Portfolio Transactions
            modelBuilder.Entity<PortfolioTransaction>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(e => e.User)
                      .WithMany()
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(e => e.Provider)
                      .WithMany()
                      .HasForeignKey(e => e.ProviderId)
                      .OnDelete(DeleteBehavior.SetNull);

                entity.Property(e => e.Type).IsRequired().HasMaxLength(10); // Buy/Sell
                entity.Property(e => e.Brand).HasMaxLength(100);
                entity.Property(e => e.GoldType).HasMaxLength(100);
                entity.Property(e => e.Quantity).HasColumnType("decimal(18,4)");
                entity.Property(e => e.PricePerTael).HasColumnType("decimal(18,2)");
                entity.Property(e => e.Notes).HasMaxLength(500);
            });
        }
    }
}
