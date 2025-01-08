

export default function InitiativeDetail({ title, description, tags, deadline}) {

    return (
        <>

        <h1>{title}</h1>
        
        <p>{description}</p>
        <p>{deadline}</p>
        <span>{tags[1]}</span>

        </>

    )
}