using Fighters.Models.Armors;
using Fighters.Models.Classes;
using Fighters.Models.Fighters;
using Fighters.Models.Races;
using Fighters.Models.Weapons;

namespace Fighters.UI
{
    public class FighterBuilder
    {
        private static readonly List<IRace> Races =
        [
            new Human(),
            new Elf(),
            new Orc(),
            new Dwarf(),
        ];

        private static readonly List<IFighterClass> Classes =
        [
            new Knight(),
            new Mercenary(),
            new Berserker(),
        ];

        private static readonly List<IWeapon> Weapons =
        [
            new Fists(),
            new Sword(),
            new Axe(),
            new Bow(),
            new Daggers(),
        ];

        private static readonly List<IArmor> Armors =
        [
            new NoArmor(),
            new ClothArmor(),
            new LeatherArmor(),
            new PlateArmor(),
        ];

        public IFighter Build()
        {
            string name = AskName();
            IRace race = AskChoice( "Choose your race:", Races, r => r.Name );
            IFighterClass fighterClass = AskChoice( "Choose your class:", Classes, c => c.Name );
            IWeapon weapon = AskChoice( "Chose your weapon:", Weapons, w => $"{w.Name} (dmg {w.Damage})" );
            IArmor armor = AskChoice( "Choose your armor:", Armors, a => $"{a.Name} (arm {a.Armor})" );

            return new Fighter( name, race, fighterClass, weapon, armor );
        }

        private string AskName()
        {
            while ( true )
            {
                Console.WriteLine( "Inpur wariors name:" );
                string? name = Console.ReadLine();
                if ( !string.IsNullOrWhiteSpace( name ) )
                {
                    return name.Trim();
                }
                Console.WriteLine( "Name cant be empty, try again" );
            }
        }

        private static T AskChoice<T>( string prompt, List<T> options, Func<T, string> describe )
        {
            while ( true )
            {
                Console.WriteLine( prompt );
                for ( int i = 0; i < options.Count; i++ )
                {
                    Console.WriteLine( $"  {i} - {describe( options[ i ] )}" );
                }

                string? input = Console.ReadLine();
                if ( int.TryParse( input?.Trim(), out int idx ) && idx >= 0 && idx < options.Count )
                {
                    return options[ idx ];
                }

                Console.WriteLine( $"You must input number in range(0, {options.Count - 1}), try againt" );
            }
        }
    }
}
