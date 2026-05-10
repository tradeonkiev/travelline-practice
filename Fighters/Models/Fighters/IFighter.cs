using Fighters.Models.Armors;
using Fighters.Models.Classes;
using Fighters.Models.Races;
using Fighters.Models.Weapons;

namespace Fighters.Models.Fighters
{
    public interface IFighter
    {
        string Name { get; }
        IRace Race { get; }
        IFighterClass Class { get; }
        IWeapon Weapon { get; }
        IArmor Armor { get; }

        int GetCurrentHealth();
        int GetMaxHealth();

        int CalculateDamage();
        int CalculateArmor();
        int CalculateInitiative();

        void SetWeapon( IWeapon weapon );
        void SetArmor( IArmor armor );

        bool TryDodge();
        void Regenerate();
        void Regenerate( int heal );

        void TakeDamage( int damage );
        bool IsAlive();
    }
}
