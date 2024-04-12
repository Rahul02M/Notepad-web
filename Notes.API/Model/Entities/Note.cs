namespace Notes.API.Model.Entities
{
    public class Note
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsVisiable {  get; set; }
    }
}
