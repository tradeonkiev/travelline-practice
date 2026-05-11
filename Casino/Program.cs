internal class Program
{
    private const string AllBetCommand = "all";

    private const int MinDiceValue = 1;
    private const int MaxDiceValue = 21;

    private const int MinWinValue = 18;
    private const int MaxWinValue = 20;

    private const int WinPercentAddMultiplier = 20;
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

        if ( balance - bet < 0 || bet <= 0 )
        {
            return ( balance - bet < 0 ) ? OptionResult.InvalidBalance : OptionResult.InvalidInput;
        }

        balance -= bet;
        int seed = Random.Shared.Next( MinDiceValue, MaxDiceValue );
        Console.WriteLine( $"Rolled: {seed}" );

        if ( seed >= MinWinValue && seed <= MaxWinValue )
        {
            decimal payout = CalculateWinAmount( bet, seed );
            balance += bet + payout;
            Console.Write( $"You won +{payout}. Try again" );
        }
        else
        {
            Console.Write( $"You lost -{bet}. Try again" );
        }

        Console.WriteLine( $"Your balance: {balance}" );

        return OptionResult.Success;
    }

    private static decimal CalculateWinAmount( decimal value, int seed )
    {
        decimal winPercent = WinPercentAddMultiplier * ( seed % WinModul );

        if ( winPercent < 0 )
            return 0;

        return value * winPercent / 100;
    }

    private static OptionResult MakeDeposit()
    {
        Console.Write( "Deposit money: " );
        string depositStr = Console.ReadLine() ?? "";

        bool isValid = int.TryParse( depositStr, out int deposit ) && deposit > 0 && int.MaxValue - deposit > balance;

        if ( !isValid )
        {
            return OptionResult.Error;
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
