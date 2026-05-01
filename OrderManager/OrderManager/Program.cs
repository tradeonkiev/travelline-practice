using System.Text;
using OrderManager;

internal class Program
{
    private const string InvalidCountMessage = "Число товаров не может быть меньше 1. Повторите попытку ввода";
    private const string InvalidInputMessage = "Неправильный ввод! Введите число";
    private static readonly HashSet<string> AffirmativeResponses = new HashSet<string> { "yes", "y", "да" };

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

    private static void PrintOrderStatus( Order order )
    {
        if ( !order.IsConfirmed )
        {
            Console.WriteLine( "Заказ не был подтверждён" );
            return;
        }

        DateTime deliveryDate = order.GetDeliveryDate();
        Console.WriteLine( $"{order.BuyerName}! Ваш заказ {order.Product} в количестве {order.ProductCount} оформлен! " +
            $"Ожидайте доставку по адресу {order.BuyerAddress} к {deliveryDate:dd.MM.yyyy}" );
    }

    private static void Main()
    {
        Console.OutputEncoding = Encoding.UTF8;
        Console.InputEncoding = Encoding.UTF8;

        string productName = GetString( "Введите название продукта: " );
        int productCount = GetInt( "Введите количество товара: " );
        string buyer = GetString( "Введите свое имя: " );
        string address = GetString( "Введите адрес доставки: " );

        Order order = new Order( productName, productCount, buyer, address );

        Console.WriteLine( $"Здравствуйте, {order.BuyerName}, вы заказали {order.ProductCount} {order.Product} на адрес {order.BuyerAddress}, все верно?" );
        string answer = Console.ReadLine()?.Trim().ToLower() ?? "";

        order.SetConfirmation( AffirmativeResponses.Contains( answer ) );

        PrintOrderStatus( order );
    }
}