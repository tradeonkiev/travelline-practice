using System.Text;


class Order
{
    private string product;
    private string buyerName;
    private string buyerAddress;
    private int productCount;
    private bool isConfirmed = false;


    private const int deliveryWaitingTime = 3;

    public Order(
        string product,
        int count,
        string buyer,
        string address )
    {
        this.product = product;
        productCount = count;
        buyerName = buyer;
        buyerAddress = address;
    }

    public bool Confirm()
    {
        Console.WriteLine( $"Здравствуйте, {buyerName}, вы заказали {productCount} {product} на адрес {buyerAddress}, все верно?" );
        string answer = Console.ReadLine()?.ToLower().Trim() ?? "";
        isConfirmed = answer == "да" || answer == "yes" || answer == "y";
        return isConfirmed;
    }

    public void PrintSuccess()
    {
        if ( !isConfirmed )
        {
            Console.WriteLine( "Заказ не был подтверждён" );
            return;
        }

        DateTime deliveryDate = DateTime.Today.AddDays( deliveryWaitingTime );
        Console.WriteLine( $"{buyerName}! Ваш заказ {product} в количестве {productCount} оформлен! " +
            $"Ожидайте доставку по адресу {buyerAddress} к {deliveryDate:dd.MM.yyyy}" );
    }
}

class Programm
{

    static string GetString( string prompt )
    {
        Console.Write( prompt );
        return Console.ReadLine() ?? "";
    }
    static int GetInt( string prompt )
    {
        Console.Write( prompt );
        while ( true )
        {
            if ( int.TryParse( Console.ReadLine(), out int value ) )
                return value;
            Console.WriteLine( "Invalid input! Please enter a number" );
        }
    }

    static void Main()
    {
        Console.OutputEncoding = Encoding.UTF8;

        string productName = GetString( "Enter product name: " );
        int productCount = GetInt( "Enter product count: " );
        string buyer = GetString( "Enter your name: " );
        string address = GetString( "Enter delivery address: " );

        Order order = new Order( productName, productCount, buyer, address );
        order.Confirm();
        order.PrintSuccess();
    }

}


