using TrumpVerse.Interfaces;
namespace TrumpVerse.Models;

public class Staff : IStaff
{
    public int Id {get; set;}
    public required string Name {get; set;}
    public int? Age {get; set;}
    public required string Position {get; set;}
    public string? CriminalCharges {get; set;}
    public bool? Convicted {get; set;}
    public string? Image {get; set;}
}