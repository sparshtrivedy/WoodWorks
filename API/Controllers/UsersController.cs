using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    public class UsersController : BaseApiController
    {
        private readonly StoreContext _context;
        public UsersController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Users>>> GetUser(string Email, string Password)
        {  
            return await _context.Users.Where(u => u.Email == Email && u.Password == Password).ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<List<Users>>> PostUser(string Email, string Password)
        {
            _context.Users.Add(new Users{Email = Email, Password = Password});
            _context.SaveChanges();
            return await _context.Users.ToListAsync();
        }
    }
}