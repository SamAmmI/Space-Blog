interface BlogcardProps {
    title: string;
    imageUrl?: string | null;
    summary?: string | null;
    url?: string | null;
    publishedAt?: string | null;
}

function Blogcard({ title, imageUrl, summary, url }: BlogcardProps) {
    return (
        <div className="card">
            {imageUrl ? (
                <img className="card-image" src={imageUrl} alt={title}></img>
            ) : (
                <div className="card-image placeholder" aria-hidden="true" />
            )}
            <h2 className="card-title">{title}</h2>
            {summary ? <p className="card-text">{summary.length > 150 ? summary.slice(0, 150) + '...' : summary}</p> : null}
            {url ? (
                <p className="card-link">
                    <a href={url} target="_blank" rel="noreferrer">Read more</a>
                </p>
            ) : null}
        </div>
    );
}

export default Blogcard;