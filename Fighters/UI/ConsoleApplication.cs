
using Fighters.Game;
using Fighters.Models.Fighters;

namespace Fighters.UI
{
    public class ConsoleApplication
    {
        private readonly List<IFighter> _fighters = [];
        private readonly FighterBuilder _builder;

        private static readonly HashSet<string> AffirmativeResponse = new HashSet<string> { "yes", "y", "да" };
        public ConsoleApplication()
        {
            _builder = new FighterBuilder();
        }

        public void Run()
        {
            Console.WriteLine( "Arena of death " );
            PrintHelp();

            while ( true )
            {
                Console.WriteLine( string.Empty );
                Console.WriteLine( "Choose option (help — show comands):" );
                string command = ( Console.ReadLine() ?? string.Empty ).Trim().ToLowerInvariant();

                switch ( command )
                {
                    case "":
                        continue;
                    case "help":
                        PrintHelp();
                        break;
                    case "add-fighter":
                        AddFighter();
                        break;
                    case "list":
                        ListFighters();
                        break;
                    case "remove":
                        RemoveFighter();
                        break;
                    case "play":
                        Play();
                        break;
                    case "refill":
                        Refill();
                        break;
                    case "exit":
                    case "quit":
                        Console.WriteLine( "Bye! chmok" );
                        return;
                    default:
                        Console.WriteLine( $"Unknown command: \"{command}\", help - show all commands" );
                        break;
                }
            }
        }

        private void PrintHelp()
        {
            Console.WriteLine( "All commands:" );
            Console.WriteLine( "  add-fighter   — add new warrior" );
            Console.WriteLine( "  list          — show warriors" );
            Console.WriteLine( "  remove        — delete commands by index" );
            Console.WriteLine( "  play          — start fight (need 2 warriors to start)" );
            Console.WriteLine( "  refill        — heal warrior" );
            Console.WriteLine( "  help          - show all commands" );
            Console.WriteLine( "  exit          — you are stupid?" );
        }

        private void AddFighter()
        {
            try
            {
                IFighter fighter = _builder.Build();
                _fighters.Add( fighter );
                Console.WriteLine( $"Warrior \"{fighter.Name}\" added" );
            }
            catch ( Exception ex )
            {
                Console.WriteLine( $"Cant create warrior: {ex.Message}" );
            }
        }

        private void ListFighters()
        {
            if ( _fighters.Count == 0 )
            {
                Console.WriteLine( "There is no one in the arena" );
                return;
            }

            Console.WriteLine( $"There are {_fighters.Count} fighters in the arena:" );
            for ( int i = 0; i < _fighters.Count; i++ )
            {
                IFighter f = _fighters[ i ];
                Console.WriteLine( $"  {i}: {f.Name} [{f.Race.Name} - {f.Class.Name}] " +
                           $"hp {f.GetMaxHealth()}, current hp {f.GetCurrentHealth()} " +
                           $"strangth {f.CalculateDamage()}, armor {f.CalculateArmor()}, " +
                           $"aggression {f.CalculateInitiative()}" );
            }
        }

        private void RemoveFighter()
        {
            if ( _fighters.Count == 0 )
            {
                Console.WriteLine( "Nobody to delete" );
                return;
            }

            ListFighters();
            Console.WriteLine( "Input the fighter number to remove:" );
            string? input = Console.ReadLine();
            if ( int.TryParse( input?.Trim(), out int idx ) && idx >= 0 && idx < _fighters.Count )
            {
                string removed = _fighters[ idx ].Name;
                _fighters.RemoveAt( idx );
                Console.WriteLine( $"Warrior \"{removed}\" removed" );
            }
            else
            {
                Console.WriteLine( "Invalid index" );
            }
        }

        private void Play()
        {
            if ( _fighters.Count < 2 )
            {
                Console.WriteLine( "At least 2 fighters are required. Use add-fighter" );
                return;
            }

            List<IFighter> notFresh = [ .. _fighters.Where( f => f.GetCurrentHealth() != f.GetMaxHealth() ) ];
            if ( notFresh.Count > 0 )
            {
                Console.WriteLine( "Warning: Some fighters have low HP after the last battle. Heal them with a \"refill\" if you want a fresh start" );
                Console.Write( "Continue? " );
                string answer = Console.ReadLine()?.Trim().ToLower() ?? "";
                Console.WriteLine();
                if ( !AffirmativeResponse.Contains( answer ) )
                {
                    return;
                }

            }

            // я вот хз я сначала прокидывал обработчик атаки сам но потом чет решид по умолчанию просто сделать но оставил возможность прокидывать
            GameManager manager = new GameManager();

            List<IFighter> alive = [ .. _fighters.Where( f => f.IsAlive() ) ];
            if ( alive.Count < 2 )
            {
                Console.WriteLine( "There are less than two living fighters - no one to fight" );
                return;
            }

            IFighter winner = manager.Play( alive );
            Console.WriteLine( $"Winner: {winner.Name}." );
        }

        private void Refill()
        {
            if ( _fighters.Count == 0 )
            {
                Console.WriteLine( "There's no one in the arena. Enter add-fighter to add a warrior" );
                return;
            }
            ListFighters();

            Console.WriteLine( "Input warrior's index to heal:" );
            string? input = Console.ReadLine();
            if ( int.TryParse( input?.Trim(), out int idx ) && idx >= 0 && idx < _fighters.Count )
            {
                Console.WriteLine( "Input how much you want to heal?" );
                input = Console.ReadLine();
                if ( int.TryParse( input?.Trim(), out int heal ) && heal >= 0 )
                {
                    IFighter fighter = _fighters[ idx ];
                    Console.WriteLine( $"{fighter.GetCurrentHealth()}, {fighter.GetMaxHealth()}" );
                    fighter.Regenerate( heal );
                }
                else
                {
                    Console.WriteLine( "Invalid value" );
                }

            }
            else
            {
                Console.WriteLine( "Invalid index" );
            }


        }

    }
}
