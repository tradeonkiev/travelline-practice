using Casino;

internal class Program
{
    private const decimal MaxBalanceValue = 1_000_000_000m;

    private const string AllBetCommand = "all";

    private const int MinDiceValue = 1;
    private const int MaxDiceValue = 21;

    private const int MinWinValue = 18;
    private const int MaxWinValue = 20;

    private const int WinPercentMultiplier = 20;
    private const int WinModul = 17;

    private static readonly string[] MenuOptions = [ "1. Deposit", "2. Show balance", "3. Play", "4. Quit" ];

    private static decimal balance = 0m;
    private static bool isGameOver = false;

    private static void Main( string[] args )
    {
        while ( !isGameOver )
        {
            PrintHeader();
            PrintMenu();

            string option = Console.ReadLine() ?? "";
            OptionResult result = HandleOptions( option );

            string message = result switch
            {
                OptionResult.Error => "Error Issue",
                OptionResult.InvalidInput => "Invalid input",
                OptionResult.InvalidBalance => "Insufficient funds on balance",
                OptionResult.BalanceLimit => "The maximum balance limit has been exceeded",
                _ => ""
            };

            if ( !string.IsNullOrEmpty( message ) )
            {
                Console.WriteLine( message );
            }

            Console.WriteLine();
        }
    }

    private static OptionResult HandleOptions( string option )
    {
        return option switch
        {
            "1" => MakeDeposit(),
            "2" => ShowBalance(),
            "3" => Play(),
            "4" => Quit(),
            _ => OptionResult.InvalidInput,
        };
    }

    private static OptionResult Play()
    {
        Console.Write( $"Enter your bet (or type \"{AllBetCommand}\"): " );
        string input = Console.ReadLine()?.Trim().ToLower() ?? "";
        decimal bet;

        if ( input == AllBetCommand )
        {
            bet = balance;
        }
        else if ( !decimal.TryParse( input, out bet ) )
        {
            return OptionResult.InvalidInput;
        }

        if ( balance - bet < 0 )
        {
            return OptionResult.InvalidBalance;
        }
        else if ( bet <= 0 )
        {
            return OptionResult.InvalidInput;
        }

        balance -= bet;

        BetResult result = DetermineBetOutcome( bet );

        Console.WriteLine( $"Rolled: {result.RolledValue}" );

        if ( result.IsWin )
        {
            balance += bet + result.Payout;
            Console.Write( $"You won +{result.Payout}. " );
        }
        else
        {
            Console.Write( $"You lost -{bet}. " );
        }

        Console.WriteLine( $"Your balance: {balance}" );

        return OptionResult.Success;
    }

    private static BetResult DetermineBetOutcome( decimal bet )
    {
        int rolledValue = Random.Shared.Next( MinDiceValue, MaxDiceValue );

        if ( rolledValue >= MinWinValue && rolledValue <= MaxWinValue )
        {
            decimal payout = CalculateWinAmount( bet, rolledValue );

            return new BetResult( IsWin: true, RolledValue: rolledValue, Payout: payout );
        }

        return new BetResult( IsWin: false, RolledValue: rolledValue, Payout: 0 );
    }


    private static decimal CalculateWinAmount( decimal value, int seed )
    {
        decimal winPercent = WinPercentMultiplier * ( seed % WinModul );

        if ( winPercent < 0 )
        {
            return 0;
        }

        return value * winPercent / 100;
    }

    private static OptionResult MakeDeposit()
    {
        Console.Write( "Deposit money: " );
        string depositStr = Console.ReadLine() ?? "";

        if ( !decimal.TryParse( depositStr, out decimal deposit ) || deposit <= 0 )
        {
            return OptionResult.InvalidInput;
        }

        if ( balance + deposit > MaxBalanceValue )
        {
            return OptionResult.BalanceLimit;
        }

        balance += deposit;

        return OptionResult.Success;
    }

    private static OptionResult ShowBalance()
    {
        Console.WriteLine( $"Your balance: {balance}" );

        return OptionResult.Success;
    }

    private static OptionResult Quit()
    {
        isGameOver = true;

        return OptionResult.Success;
    }

    private static void PrintHeader()
    {
        Console.WriteLine( "Casino" );
    }

    private static void PrintMenu()
    {
        foreach ( string item in MenuOptions )
        {
            Console.WriteLine( item );
        }
    }
}
