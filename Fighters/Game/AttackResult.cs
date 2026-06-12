using Fighters.Models.Fighters;

namespace Fighters.Game
{
    public record AttackResult(
        IFighter Attacker,
        IFighter Defender,
        int RawDamage,
        int ModifiedDamage,
        int DamageDealt,
        bool IsCritical,
        bool IsDodged,
        bool DefenderDied );
}
