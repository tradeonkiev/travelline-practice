namespace Fighters.Models.Races
{
    public class Elf : IRace
    {
        public string Name => "Elf";
        public int Damage => 2;
        public int Health => 80;
        public int Armor => 0;
        public int Initiative => 18;
        public int Regeneration => 10;
    }
}
