using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Solar;
using Solar.Models;

namespace Solar.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherDatasController : ControllerBase
    {
        private readonly AppContext _context;

        public WeatherDatasController(AppContext context)
        {
            _context = context;
        }

        // GET: api/WeatherDatas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<WeatherData>>> GetWeatherData()
        {
            return await _context.WeatherData.Include(c => c.House).ToListAsync();
        }

        // GET: api/WeatherDatas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<WeatherData>> GetWeatherData(int id)
        {
            var weatherData = await _context.WeatherData.FindAsync(id);

            if (weatherData == null)
            {
                return NotFound();
            }

            return weatherData;
        }

        // PUT: api/WeatherDatas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWeatherData(int id, WeatherData weatherData)
        {
            if (id != weatherData.Id)
            {
                return BadRequest();
            }

            _context.Entry(weatherData).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WeatherDataExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/WeatherDatas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<WeatherData>> PostWeatherData(WeatherData weatherData)
        {
            _context.WeatherData.Add(weatherData);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWeatherData", new { id = weatherData.Id }, weatherData);
        }

        // DELETE: api/WeatherDatas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWeatherData(int id)
        {
            var weatherData = await _context.WeatherData.FindAsync(id);
            if (weatherData == null)
            {
                return NotFound();
            }

            _context.WeatherData.Remove(weatherData);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WeatherDataExists(int id)
        {
            return _context.WeatherData.Any(e => e.Id == id);
        }
    }
}
