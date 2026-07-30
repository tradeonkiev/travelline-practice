namespace Casino
{
    internal readonly record struct BetResult( bool IsWin, int RolledValue, decimal Payout );
}
