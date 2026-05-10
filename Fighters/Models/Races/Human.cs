namespace Fighters.Models.Races
{
    public class Human : IRace
    {
        public string Name => "Human";
        public int Damage => 1;
        public int Health => 100;
        public int Armor => 0;
        public int Initiative => 10;
        public int Regeneration => 1;
    }
}
