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
    public class SolarPanelsController : ControllerBase
    {
        private readonly AppContext _context;

        public SolarPanelsController(AppContext context)
        {
            _context = context;
        }

        // GET: api/SolarPanels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SolarPanel>>> GetSolarPanels()
        {
            return await _context.SolarPanels.Include(c => c.PanelType).Include(c => c.House).ToListAsync();
        }

        // GET: api/SolarPanels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SolarPanel>> GetSolarPanel(int id)
        {
            var solarPanel = await _context.SolarPanels.FindAsync(id);

            if (solarPanel == null)
            {
                return NotFound();
            }

            return solarPanel;
        }

        // PUT: api/SolarPanels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolarPanel(int id, SolarPanel solarPanel)
        {
            if (id != solarPanel.Id)
            {
                return BadRequest();
            }

            _context.Entry(solarPanel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolarPanelExists(id))
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

        // POST: api/SolarPanels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SolarPanel>> PostSolarPanel(SolarPanel solarPanel)
        {
            _context.SolarPanels.Add(solarPanel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSolarPanel", new { id = solarPanel.Id }, solarPanel);
        }

        // DELETE: api/SolarPanels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolarPanel(int id)
        {
            var solarPanel = await _context.SolarPanels.FindAsync(id);
            if (solarPanel == null)
            {
                return NotFound();
            }

            _context.SolarPanels.Remove(solarPanel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SolarPanelExists(int id)
        {
            return _context.SolarPanels.Any(e => e.Id == id);
        }
    }
}
