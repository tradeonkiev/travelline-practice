namespace Fighters.Models.Classes
{
    public class Mercenary : IFighterClass
    {
        public string Name => "Mercenary";
        public int Damage => 7;
        public int Health => 30;
        public int Initiative => 8;
        public int Regeneration => 1;
        public double DodgeChance => 0.2;
    }
}
