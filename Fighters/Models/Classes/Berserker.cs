namespace Fighters.Models.Classes
{
    public class Berserker : IFighterClass
    {
        public string Name => "Berserker";
        public int Damage => 12;
        public int Health => 20;
        public int Initiative => 12;
        public int Regeneration => 10;
        public double DodgeChance => 0;
    }
}
