namespace Fighters.Models.Races
{
    public class Dwarf : IRace
    {
        public string Name => "Dwarf";
        public int Damage => 3;
        public int Health => 110;
        public int Armor => 3;
        public int Initiative => 8;
        public int Regeneration => 5;
    }
}
