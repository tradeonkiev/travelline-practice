using Fighters.Models.Armors;
using Fighters.Models.Classes;
using Fighters.Models.Races;
using Fighters.Models.Weapons;

namespace Fighters.Models.Fighters
{
    public class Fighter : IFighter
    {
        private int _currentHealth;

        public string Name { get; }
        public IRace Race { get; }
        public IFighterClass Class { get; }
        public IWeapon Weapon { get; private set; }
        public IArmor Armor { get; private set; }

        private static readonly Random _random = new();

        public Fighter(
            string name,
            IRace race,
            IFighterClass fighterClass,
            IWeapon weapon,
            IArmor armor )
        {
            if ( string.IsNullOrWhiteSpace( name ) )
            {
                throw new ArgumentException( "Name cant be empty", nameof( name ) );
            }

            Name = name;
            Race = race;
            Class = fighterClass;
            Weapon = weapon;
            Armor = armor;

            _currentHealth = GetMaxHealth();
        }

        public int GetCurrentHealth()
        {
            return _currentHealth;
        }

        public int GetMaxHealth()
        {
            return Race.Health + Class.Health;
        }

        public int CalculateDamage()
        {
            return Race.Damage + Class.Damage + Weapon.Damage;
        }

        public int CalculateArmor()
        {
            return Race.Armor + Armor.Armor;
        }

        public int CalculateInitiative()
        {
            return Race.Initiative + Class.Initiative;
        }

        public void TakeDamage( int damage )
        {
            if ( damage < 0 )
            {
                throw new ArgumentOutOfRangeException( nameof( damage ), "Damage cannot be negative" );
            }

            int newHealth = _currentHealth - damage;
            _currentHealth = Math.Max( 0, newHealth );
        }


        // убрал тут проверку на то что хил негативен хотел добавить расу у которой сердечная недостаточность
        public void Regenerate()
        {
            int heal = Race.Regeneration + Class.Regeneration;

            int newHealth = _currentHealth + heal;
            _currentHealth = Math.Min( newHealth, GetMaxHealth() );
        }

        public void Regenerate( int heal )
        {
            if ( heal < 0 )
            {
                throw new ArgumentOutOfRangeException( nameof( heal ), "The value of Heal cannot be negative" );
            }
            int newHealth = _currentHealth + heal;
            _currentHealth = Math.Min( newHealth, GetMaxHealth() );
        }

        public bool TryDodge()
        {
            double seed = _random.NextDouble();
            return seed < Class.DodgeChance;
        }

        public bool IsAlive()
        {
            return _currentHealth > 0;
        }

        public override string ToString()
        {
            return $"{Name}\t[{Race.Name}\t- {Class.Name}],\t" +
                $"weapon: {Weapon.Name},\tarmor name: {Armor.Name},\t" +
                $"hp {GetMaxHealth()},\tstrength {CalculateDamage()},\t" +
                $"armor {CalculateArmor()},\tinit. {CalculateInitiative()}";
        }
    }
}
