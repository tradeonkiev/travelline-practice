namespace Fighters.Models.Classes
{
    public class Knight : IFighterClass
    {
        public string Name => "Knight";
        public int Damage => 5;
        public int Health => 50;
        public int Initiative => 4;
        public int Regeneration => 5;
        public double DodgeChance => 0;
    }
}
