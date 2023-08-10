using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace DotNetAngularCRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private static List<Item> items = new List<Item>();

        [HttpGet]
        public ActionResult<IEnumerable<Item>> Get()
        {
            return items;
        }

        [HttpPost]
        public ActionResult<Item> Create(Item item)
        {
            item.Id = items.Count + 1;
            items.Add(item);
            return item;
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Item updatedItem)
        {
            var existingItem = items.FirstOrDefault(i => i.Id == id);
            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Name = updatedItem.Name;
            existingItem.Description = updatedItem.Description;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var itemToDelete = items.FirstOrDefault(i => i.Id == id);
            if (itemToDelete == null)
            {
                return NotFound();
            }

            items.Remove(itemToDelete);
            return NoContent();
        }
    }
}