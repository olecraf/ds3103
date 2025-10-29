namespace TrumpVerse.Interfaces;

public interface IStaff
{
    int Id {get; set;}
    string Name {get; set;}
    int? Age {get; set;}
    string Position {get; set;}
    string? CriminalCharges {get; set;}
    bool? Convicted {get; set;}
    string? Image {get; set;}
}