using System.Text;
using OrderManager;

internal class Program
{
    private const string InvalidCountMessage = "Число товаров не может быть меньше 1. Повтороите попытку ввода";
    private const string InvalidInputMessage = "Неправильный ввод! Введите число";

    private static string GetString( string prompt )
    {
        Console.Write( prompt );
        return Console.ReadLine() ?? "";
    }

    private static int GetInt( string prompt )
    {
        Console.Write( prompt );
        while ( true )
        {
            if ( int.TryParse( Console.ReadLine(), out int value ) )
            {
                if ( value < 1 )
                {
                    Console.WriteLine( InvalidCountMessage );
                    continue;
                }

                return value;
            }

            Console.WriteLine( InvalidInputMessage );
        }
    }

    private static void Main()
    {
        Console.OutputEncoding = Encoding.UTF8;
        Console.InputEncoding = Encoding.UTF8;

        string productName = GetString( "Введите название продукта: " );
        int productCount = GetInt( "Введите колличество товара: " );
        string buyer = GetString( "Введите свое имя: " );
        string address = GetString( "Введите адрес доставки: " );

        Order order = new( productName, productCount, buyer, address );
        order.Confirm();
        order.PrintOrderStatus();
    }
}
