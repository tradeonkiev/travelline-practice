namespace OrderManager
{
    public class Order
    {
        public string Product { get; set; }
        public string BuyerName { get; set; }
        public string BuyerAddress { get; set; }
        public int ProductCount { get; set; }
        public bool IsConfirmed { get; set; } = false;
        private const int DeliveryWaitingTime = 3;

        public Order(
            string product,
            int count,
            string buyer,
            string address )
        {
            Product = product;
            BuyerName = buyer;
            BuyerAddress = address;
            ProductCount = count;
        }

        public void Confirm()
        {
            Console.WriteLine( $"Здравствуйте, {BuyerName}, вы заказали {ProductCount} {Product} на адрес {BuyerAddress}, все верно?" );
            string answer = Console.ReadLine()?.ToLower().Trim() ?? "";
            IsConfirmed = answer is "да" or "yes" or "y";
        }

        public void PrintOrderStatus()
        {
            if ( !IsConfirmed )
            {
                Console.WriteLine( "Заказ не был подтверждён" );
                return;
            }

            DateTime deliveryDate = DateTime.Today.AddDays( DeliveryWaitingTime );
            Console.WriteLine( $"{BuyerName}! Ваш заказ {Product} в количестве {ProductCount} оформлен! " +
                $"Ожидайте доставку по адресу {BuyerAddress} к {deliveryDate:dd.MM.yyyy}" );
        }
    }

}
