using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes.API.Data;
using Notes.API.Model.Entities;

namespace Notes.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : Controller
    {
        private readonly NotesDbContext notesDbContext;
        public NotesController(NotesDbContext notesDbContext)
        {
            this.notesDbContext = notesDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllNotes()
        {
            // Get the nots from the database
            return Ok(await notesDbContext.Notes.ToListAsync());
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetNoteById(Guid id)
        {
            //await notesDbContext.Notes.FirstOrDefultAsync( x => x.Id == id );
            //or
            var note = await notesDbContext.Notes.FindAsync(id);
            if (note == null)
            {
                return NotFound();

            }
            return Ok(note);
        }

        [HttpPost]
        public async Task<ActionResult> AddNote(Note note)
        {
            note.Id = Guid.NewGuid();
            await notesDbContext.Notes.AddAsync(note);
            await notesDbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNoteById), new { id = note.Id }, note);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateNote([FromRoute] Guid id, [FromBody] Note updatedNote)
        {
            var existingNote = await notesDbContext.Notes.FindAsync(id);
            if (existingNote == null)
            {
                return NotFound();
            }
            existingNote.Title = updatedNote.Title;
            existingNote.Description = updatedNote.Description;
            existingNote.IsVisiable = updatedNote.IsVisiable;

            await notesDbContext.SaveChangesAsync();
            return Ok(existingNote);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public  async Task<IActionResult> DeleteNote([FromRoute] Guid id )
        {
            var existingNote = await notesDbContext.Notes.FindAsync(id);
            if (existingNote == null)
            {
                return NotFound();
            }
            notesDbContext.Notes.Remove(existingNote);
            await notesDbContext.SaveChangesAsync();

            return Ok();
             
        }

    } 


}