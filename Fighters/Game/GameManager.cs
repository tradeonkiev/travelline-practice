using Fighters.Models.Fighters;

namespace Fighters.Game
{
    public class GameManager(
        IAttackResolver? attackResolver = null )
    {
        private const int RoundSafetyCap = 1000;
        private readonly IAttackResolver _attackResolver = attackResolver ?? new RandomAttackResolver();
        private readonly Random _targetRandom = new Random();

        public IFighter Play( List<IFighter> fighters )
        {
            ArgumentNullException.ThrowIfNull( fighters );
            if ( fighters.Count < 2 )
            {
                throw new ArgumentException( "A minimum of 2 fighters are needed for the fight" );
            }

            List<IndexedFighter>? indexedFighters = [ .. fighters.Select( ( fighter, index ) => new IndexedFighter( fighter, index ) ) ];

            Console.WriteLine( $"Fight was startes! Players: {fighters.Count}" );
            foreach ( IFighter f in fighters )
            {
                Console.WriteLine( $" + {f}" );
            }

            int round = 0;
            while ( CountAlive( indexedFighters ) > 1 && round < RoundSafetyCap )
            {
                round++;
                Console.WriteLine( $"* Round {round,3} " );
                PlayRound( indexedFighters );
                RegenerateAfterRound( indexedFighters );
                Console.WriteLine();
            }

            IFighter? winner = indexedFighters.FirstOrDefault( x => x.Fighter.IsAlive() )?.Fighter;
            if ( winner is not null )
            {
                Console.WriteLine( $"{winner.Name} survives and wins!" );
            }
            else
            {
                Console.WriteLine( "All players are dead, its a draw" );
            }

            return winner!;
        }

        private static void RegenerateAfterRound( IEnumerable<IndexedFighter> fighters )
        {
            foreach ( IndexedFighter indexedFighter in fighters )
            {
                IFighter fighter = indexedFighter.Fighter;

                if ( !fighter.IsAlive() )
                {
                    continue;
                }

                int hpBefore = fighter.GetCurrentHealth();
                fighter.Regenerate();
                int healed = fighter.GetCurrentHealth() - hpBefore;

                if ( healed > 0 )
                {
                    Console.WriteLine( $"  +{fighter.Name} regenerates {healed,3} hp" );
                }

            }
        }

        private void PlayRound( List<IndexedFighter> indexedFighters )
        {
            List<IndexedFighter> turnOrder = [ .. indexedFighters
                .Where( x => x.Fighter.IsAlive() )
                .OrderByDescending( x => x.Fighter.CalculateInitiative() )
                .ThenBy( x => x.OriginalIndex ) ];

            foreach ( IndexedFighter indexed in turnOrder )
            {
                IFighter attacker = indexed.Fighter;

                if ( !attacker.IsAlive() )
                {
                    continue;
                }

                List<IFighter>? aliveOpponents = [ .. indexedFighters.Where( x => x.Fighter != attacker && x.Fighter.IsAlive() ).Select( x => x.Fighter ) ];

                if ( aliveOpponents.Count == 0 )
                {
                    return;
                }

                IFighter target = aliveOpponents.Count == 1 ? aliveOpponents[ 0 ] : aliveOpponents[ _targetRandom.Next( aliveOpponents.Count ) ];

                AttackResult result = _attackResolver.Resolve( attacker, target );

                Console.WriteLine( FormatAttack( result ) );

                if ( result.DefenderDied )
                {
                    Console.WriteLine( $"  {target.Name} die!" );
                }
            }
        }

        private static int CountAlive( List<IndexedFighter> fighters )
        {
            return fighters.Count( x => x.Fighter.IsAlive() );
        }

        private static string FormatAttack( AttackResult result )
        {
            string battleEvent = result.IsDodged ? "DODGE" : result.IsCritical ? "CRIT" : "\t";
            return $"  {result.Attacker.Name} => {result.Defender.Name}:\t" +
                $"{result.DamageDealt,3}dmg {battleEvent} " +
                $"(hit {result.ModifiedDamage},\tarmor {result.Defender.CalculateArmor()};\t" +
                $"hp {result.Defender.GetCurrentHealth()}/{result.Defender.GetMaxHealth()})";
        }
    }
}
