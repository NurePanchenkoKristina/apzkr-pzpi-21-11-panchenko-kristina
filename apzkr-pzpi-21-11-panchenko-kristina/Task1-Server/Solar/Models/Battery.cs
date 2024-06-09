using System;

namespace Solar.Models
{
    public class Battery
    {
        public int Id { get; set; }
        public House House { get; set; }
        public int HouseId { get; set; }
        public int Capacity { get; set; }
        public string BatteryType { get; set; }
        public DateTime InstallationDate { get; set; }
    }
}
