using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersTodoListsController : ControllerBase
    {
        private readonly TodoContext _context;

        public UsersTodoListsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/UsersTodoLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersTodoList>>> GetUsersTodoList()
        {
            return await _context.UsersTodoList.ToListAsync();
        }

        // GET: api/UsersTodoLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersTodoList>> GetUsersTodoList(long id)
        {
            var usersTodoList = await _context.UsersTodoList.FindAsync(id);

            if (usersTodoList == null)
            {
                return NotFound();
            }

            return usersTodoList;
        }

        // PUT: api/UsersTodoLists/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersTodoList(long id, UsersTodoList usersTodoList)
        {
            if (id != usersTodoList.Id)
            {
                return BadRequest();
            }

            _context.Entry(usersTodoList).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersTodoListExists(id))
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

        // POST: api/UsersTodoLists
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<UsersTodoList>> PostUsersTodoList(UsersTodoList usersTodoList)
        {
            _context.UsersTodoList.Add(usersTodoList);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsersTodoList", new { id = usersTodoList.Id }, usersTodoList);
        }

        // DELETE: api/UsersTodoLists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UsersTodoList>> DeleteUsersTodoList(long id)
        {
            var usersTodoList = await _context.UsersTodoList.FindAsync(id);
            if (usersTodoList == null)
            {
                return NotFound();
            }

            _context.UsersTodoList.Remove(usersTodoList);
            await _context.SaveChangesAsync();

            return usersTodoList;
        }

        private bool UsersTodoListExists(long id)
        {
            return _context.UsersTodoList.Any(e => e.Id == id);
        }
    }
}
