using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace WeatherDetector
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void SubmitButton_Click(object sender, RoutedEventArgs e)
        {

            WeatherData weatherData = null;

            try
            {
                weatherData = new WeatherData()
                {
                    Precipitation = int.Parse(PrecipitationInput.Text),
                    DateTime = DateTime.Parse(DatetimeInput.Text),
                    Humidity = int.Parse(HumidityInput.Text),
                    Temperature = int.Parse(TemperatureInput.Text),
                    HouseId = int.Parse(HouseIdInput.Text),
                };
            }
            catch
            {
                MessageBox.Show("Inputs value format error");
            }

            using (var client = new HttpClient())
            {
                string url = "https://localhost:5001/api/WeatherDatas";
                var json = JsonSerializer.Serialize(weatherData);

                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var request = new HttpRequestMessage(new HttpMethod("POST"), url)
                {
                    Content = content
                };

                try
                {
                    var response = client.SendAsync(request).Result;
                }
                catch (Exception ex)
                {
                }
            }
        }


        public class WeatherData
        {
            public DateTime DateTime { get; set; }
            public int Temperature { get; set; }
            public int Humidity { get; set; }
            public int Precipitation { get; set; }
            public int HouseId { get; set; }
        }

        private void HouseIdInput_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void PrecipitationInput_TextChanged(object sender, TextChangedEventArgs e)
        {

        }
    }
}