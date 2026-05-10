namespace Fighters.Models.Classes
{
    public interface IFighterClass
    {
        string Name { get; }
        int Damage { get; }
        int Health { get; }
        int Initiative { get; }
        int Regeneration { get; }
        double DodgeChance { get; }
    }
}
