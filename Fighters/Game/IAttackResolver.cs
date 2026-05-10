using Fighters.Models.Fighters;

namespace Fighters.Game
{
    public interface IAttackResolver
    {
        AttackResult Resolve( IFighter attacker, IFighter defender );
    }
}
