using System;

namespace Solar.Models
{
    public class WeatherData
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public int Temperature { get; set; }
        public int Humidity { get; set; }
        public int Precipitation { get; set; }
        public House House { get; set; }
        public int HouseId { get; set; }
    }
}