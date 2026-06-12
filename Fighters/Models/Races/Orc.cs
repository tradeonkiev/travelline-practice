namespace Fighters.Models.Races
{
    public class Orc : IRace
    {
        public string Name => "Orc";
        public int Damage => 5;
        public int Health => 130;
        public int Armor => 1;
        public int Initiative => 6;

        public int Regeneration => 0;
    }
}
