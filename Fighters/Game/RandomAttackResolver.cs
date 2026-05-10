using Fighters.Models.Fighters;

namespace Fighters.Game
{
    public class RandomAttackResolver : IAttackResolver
    {
        private readonly Random _random = new();
        private readonly double _minDamageMultiplier;
        private readonly double _maxDamageMultiplier;
        private readonly double _critChance;
        private readonly double _critMultiplier;

        private const double DefaultMinDamageMultiplier = 0.8;
        private const double DefaultMaxDamageMultiplier = 1.1;
        private const double DefaultCritChance = 0.15;
        private const double DefaultCritMultiplier = 2.0;

        public RandomAttackResolver(
            double minDamageMultiplier = DefaultMinDamageMultiplier,
            double maxDamageMultiplier = DefaultMaxDamageMultiplier,
            double critChance = DefaultCritChance,
            double critMultiplier = DefaultCritMultiplier )
        {
            if ( minDamageMultiplier > maxDamageMultiplier )
            {
                throw new ArgumentException( "min dmg cant be more then max" );
            }
            if ( critChance < 0 || critChance > 1 )
            {
                throw new ArgumentOutOfRangeException( "Crit chance must be in range(0, 1)" );
            }

            _minDamageMultiplier = minDamageMultiplier;
            _maxDamageMultiplier = maxDamageMultiplier;
            _critChance = critChance;
            _critMultiplier = critMultiplier;
        }

        public AttackResult Resolve( IFighter attacker, IFighter defender )
        {
            int rawDamage = attacker.CalculateDamage();

            double multiplier = _minDamageMultiplier + _random.NextDouble() * ( _maxDamageMultiplier - _minDamageMultiplier );

            bool isCrit = _random.NextDouble() < _critChance;
            if ( isCrit )
            {
                multiplier *= _critMultiplier;
            }


            bool isDodged = defender.TryDodge();

            int modifiedDamage = ( int )( rawDamage * multiplier );
            if ( modifiedDamage < 0 )
            {
                modifiedDamage = 0;
            }

            int armor = defender.CalculateArmor();
            int dealt = isDodged ? 0 : Math.Max( modifiedDamage - armor, 0 );

            defender.TakeDamage( dealt );
            bool died = defender.GetCurrentHealth() == 0;

            return new AttackResult(
                Attacker: attacker,
                Defender: defender,
                RawDamage: rawDamage,
                ModifiedDamage: modifiedDamage,
                DamageDealt: dealt,
                IsCritical: isCrit,
                IsDodged: isDodged,
                DefenderDied: died );
        }
    }
}
