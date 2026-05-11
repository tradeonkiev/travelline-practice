namespace OrderManager
{
    public class Order(
        string product,
        int count,
        string buyer,
        string address )
    {
        public string Product { get; private init; } = product;
        public int ProductCount { get; private init; } = count;

        public string BuyerName { get; private init; } = buyer;
        public string BuyerAddress { get; private init; } = address;

        public bool IsConfirmed { get; private set; }
        private const int DeliveryWaitingTime = 3;
        public DateTime DeliveryDate { get; } = DateTime.Now.AddDays( DeliveryWaitingTime );

        public void SetConfirmation( bool isConfirmed )
        {
            IsConfirmed = isConfirmed;
        }

    }
}
