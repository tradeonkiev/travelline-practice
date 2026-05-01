enum OptionResult
{
    Success = 0,
    Error = 1,
    InvalidInput = 2,
    InvalidBalance = 3,
};

internal class Program
{
    private static decimal balance = 0;
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
                OptionResult.InvalidInput => "Invalid Input",
                OptionResult.InvalidBalance => "Insufficient $!",
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
        Console.Write( "Enter your bet (or type \"all\"): " );
        string input = Console.ReadLine()?.Trim().ToLower() ?? "";
        decimal bet;

        if ( input == "all" )
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
        int seed = Random.Shared.Next( 1, 21 );
        Console.WriteLine( $"Rolled: {seed}" );

        if ( seed >= 18 && seed <= 20 )
        {
            decimal payout = CalculateWinAmount( bet, seed );
            balance += bet + payout;
            Console.Write( $"You won +{payout}. " );
        }
        else
        {
            Console.Write( $"You lost -{bet}. " );
        }
        Console.WriteLine( $"Your balance: {balance}" );

        return OptionResult.Success;
    }

    private static decimal CalculateWinAmount( decimal value, int seed )
    {
        int multiplicator = 20;
        decimal winPercent = multiplicator * ( seed % 17 );

        if ( winPercent < 0 )
            return 0;

        return value * winPercent / 100;
    }

    private static OptionResult MakeDeposit()
    {
        Console.WriteLine( "Deposite Money: " );
        string depositeStr = Console.ReadLine() ?? "";

        if ( !int.TryParse( depositeStr, out int deposit ) || deposit <= 0 )
        {
            return OptionResult.Error;
        }

        if ( int.MaxValue - deposit > balance )
        {
            balance += deposit;
            return OptionResult.Success;
        }

        return OptionResult.Error;
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
        List<string> menuOpts = [ "1. DEPOSIT", "2. Show balance", "3. Play", "4. Quit" ];
        foreach ( var item in menuOpts )
        {
            Console.WriteLine( item );
        }
    }
}