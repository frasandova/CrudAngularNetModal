using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using ApiCrud.Models;

namespace ApiCrud.Controllers
{
    public class PacientesController : ApiController
    {
        private CursoBD_1Entities db = new CursoBD_1Entities();

        // GET: api/Pacientes
        public IQueryable<Pacientes> GetPacientes()
        {
            return db.Pacientes;
        }

        // GET: api/Pacientes/5
        [ResponseType(typeof(Pacientes))]
        public async Task<IHttpActionResult> GetPacientes(int id)
        {
            Pacientes pacientes = await db.Pacientes.FindAsync(id);
            if (pacientes == null)
            {
                return NotFound();
            }

            return Ok(pacientes);
        }

        // PUT: api/Pacientes/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPacientes(Pacientes pacientes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (pacientes.id == 0)
            {
                return BadRequest();
            }

            db.Entry(pacientes).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PacientesExists(pacientes.id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Pacientes
        [ResponseType(typeof(Pacientes))]
        public async Task<IHttpActionResult> PostPacientes([ FromBody] Pacientes pacientes)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Pacientes.Add(pacientes);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = pacientes.id }, pacientes);
        }

        // DELETE: api/Pacientes/5
        [ResponseType(typeof(Pacientes))]
        public async Task<IHttpActionResult> DeletePacientes(int id)
        {
            Pacientes pacientes = await db.Pacientes.FindAsync(id);
            if (pacientes == null)
            {
                return NotFound();
            }

            db.Pacientes.Remove(pacientes);
            await db.SaveChangesAsync();

            return Ok(pacientes);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PacientesExists(int id)
        {
            return db.Pacientes.Count(e => e.id == id) > 0;
        }
    }
}