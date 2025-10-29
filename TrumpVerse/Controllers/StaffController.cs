using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TrumpVerse.Contexts;
using TrumpVerse.Models;

namespace TrumpVerse.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase
{
    private readonly StaffContext _staffContext;
    public StaffController(StaffContext staffContext)
    {
        _staffContext = staffContext;
    }


    [HttpGet]
    public async Task<ActionResult<List<Staff>>> Get()
    {
        try
        {
            List<Staff> staff = await _staffContext.Staff.ToListAsync();
            return Ok(staff);
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<Staff?>> Get(int id)
    {
        try
        {
            Staff? staffer = await _staffContext.Staff.FindAsync(id);
            return staffer;
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }


  [HttpPost]
    public async Task<ActionResult<Staff>> Post(Staff newStaffer)
    {
        try
        {
            _staffContext.Staff.Add(newStaffer);
            await _staffContext.SaveChangesAsync();
            return Created();
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }


    [HttpPut]
    public async Task<ActionResult<Staff>> Put(Staff updatedStaff)
    {
        try
        {
            _staffContext.Entry(updatedStaff).State = EntityState.Modified;
            await _staffContext.SaveChangesAsync();
            return updatedStaff;
        }
        catch
        {
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Staff>> Delete(int id)
    {
        Staff? deletedStaffer = await _staffContext.Staff.FindAsync(id);

        if (deletedStaffer != null)
        {
            _staffContext.Staff.Remove(deletedStaffer);
            await _staffContext.SaveChangesAsync();
            return deletedStaffer;
        }
        else
        {
            return NotFound();
        }
    }
}