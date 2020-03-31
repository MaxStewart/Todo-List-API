using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApi.Models
{
    public class UsersTodoList
    {
        public UserAccount UserAccount { get; set; }
        public List<TodoItem> TodoList { get; set; }
    }
}
