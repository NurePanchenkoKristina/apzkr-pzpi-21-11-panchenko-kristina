using System.ComponentModel.DataAnnotations;

namespace Solar.Models
{
    public class SolarPanelType
    {
        public int Id { get; set; }
        public double Power { get; set; }
        public string Manufacturer { get; set; }
        public string EfficiencyClass { get; set; }
        public string Technology { get; set; }
        public string CellType { get; set; }
        public string CellConfiguration { get; set; }
        public string Warranty { get; set; }
    }
}
