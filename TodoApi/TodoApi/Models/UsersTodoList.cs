using System.Collections.Generic;

namespace TodoApi.Models
{
    public class UsersTodoList
    {
        public long Id { get; set; }
        public UserAccount UserAccount { get; set; }
        public List<TodoItem> TodoList { get; set; }
    }
}
