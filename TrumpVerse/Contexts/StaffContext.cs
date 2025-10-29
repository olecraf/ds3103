#nullable enable
using Microsoft.EntityFrameworkCore;
using TrumpVerse.Models;

namespace TrumpVerse.Contexts;

public class StaffContext : DbContext
{
    public StaffContext(DbContextOptions<StaffContext> options):base(options){}
    public DbSet<Staff> Staff {get; set;}
}