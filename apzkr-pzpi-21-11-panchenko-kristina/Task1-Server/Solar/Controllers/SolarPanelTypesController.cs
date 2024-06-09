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
    public class SolarPanelTypesController : ControllerBase
    {
        private readonly AppContext _context;

        public SolarPanelTypesController(AppContext context)
        {
            _context = context;
        }

        // GET: api/SolarPanelTypes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SolarPanelType>>> GetSolarPanelTypes()
        {
            return await _context.SolarPanelTypes.ToListAsync();
        }

        // GET: api/SolarPanelTypes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SolarPanelType>> GetSolarPanelType(int id)
        {
            var solarPanelType = await _context.SolarPanelTypes.FindAsync(id);

            if (solarPanelType == null)
            {
                return NotFound();
            }

            return solarPanelType;
        }

        // PUT: api/SolarPanelTypes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSolarPanelType(int id, SolarPanelType solarPanelType)
        {
            if (id != solarPanelType.Id)
            {
                return BadRequest();
            }

            _context.Entry(solarPanelType).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SolarPanelTypeExists(id))
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

        // POST: api/SolarPanelTypes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SolarPanelType>> PostSolarPanelType(SolarPanelType solarPanelType)
        {
            _context.SolarPanelTypes.Add(solarPanelType);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSolarPanelType", new { id = solarPanelType.Id }, solarPanelType);
        }

        // DELETE: api/SolarPanelTypes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSolarPanelType(int id)
        {
            var solarPanelType = await _context.SolarPanelTypes.FindAsync(id);
            if (solarPanelType == null)
            {
                return NotFound();
            }

            _context.SolarPanelTypes.Remove(solarPanelType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SolarPanelTypeExists(int id)
        {
            return _context.SolarPanelTypes.Any(e => e.Id == id);
        }
    }
}
