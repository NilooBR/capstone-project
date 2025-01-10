export default function CreateInitiative() {
  return (
    <form>
      <label htmlFor="title">Initiative Title</label>
      <input name="title" type="text" required></input>
      <label htmlFor="description">Description</label>
      <textarea name="description" required></textarea>
      <label htmlFor="deadline">Deadline</label>
      <input name="deadline" type="date" required></input>
      <label htmlFor="tags">Tags (comma-separated)</label>
      <input name="tags" type="text"></input>
    </form>
  );
}
