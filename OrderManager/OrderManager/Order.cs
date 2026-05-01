namespace OrderManager
{
    public class Order(
        string product,
        int count,
        string buyer,
        string address )
    {
        public string Product { get; private init; } = product;
        public string BuyerName { get; private init; } = buyer;
        public string BuyerAddress { get; private init; } = address;
        public int ProductCount { get; private init; } = count;
        public bool IsConfirmed { get; private set; }

        private const int DeliveryWaitingTime = 3;

        public void SetConfirmation( bool status )
        {
            IsConfirmed = status;
        }

        public DateTime GetDeliveryDate()
        {
            return DateTime.Today.AddDays( DeliveryWaitingTime );
        }
    }
}
