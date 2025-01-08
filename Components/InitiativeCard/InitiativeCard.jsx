export default function InitiativeCard({ title, tags, deadline }) {
  return(<>
    <div>
      <h3>Initiative {title}</h3>
      <div>
        {tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>
      <p>Deadline: {deadline}</p>
      <div>
      <button>Update</button>
      <button>Delete</button>
      </div>
    </div>
  </>)
}
