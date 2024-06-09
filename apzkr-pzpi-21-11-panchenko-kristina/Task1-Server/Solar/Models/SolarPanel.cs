using System;

namespace Solar.Models
{
    public class SolarPanel
    {
        public int Id { get; set; }
        public House House { get; set; }
        public int HouseId { get; set; }
        public string Name { get; set; }
        public string FrameColor { get; set; }
        public SolarPanelType PanelType { get; set; }
        public int PanelTypeId { get; set; }
        public DateTime InstallationDate { get; set; }
    }
}
