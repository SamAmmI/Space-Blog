import { useEffect, useState } from 'react';
import Blogcard from './Blogcard';
import './index.css'

type RawItem = Record<string, any>;

interface Blog {
    id: string;
    title: string;
    summary?: string;
    imageUrl?: string | null;
    url?: string | null;
    publishedAt?: string | null;
}

function Spaceapi() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        let cancelled = false;

        async function fetchBlogs() {
            setLoading(true);
            setError(null);
            try {
                const offset = (page - 1) * 12;
                const check = await fetch(`https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=12&offset=${offset}`);
                if (!check.ok) throw new Error(`${check.status} ${check.statusText}`);
                const data = await check.json();

                const items: RawItem[] = Array.isArray(data) ? data : data.results ?? [];
                const mapped: Blog[] = items.map((item: RawItem) => ({
                    id: String(item.id ?? item._id ?? item.slug ?? Math.random()),
                    title: item.title ?? item.name ?? 'Untitled',
                    summary: item.summary ?? item.excerpt ?? item.description ?? '',
                    imageUrl: item.imageUrl ?? item.image_url ?? item.image ?? item.feature_image ?? null,
                    url: item.url ?? item.link ?? item.news_url ?? null,
                    publishedAt: item.published_at ?? item.publishedAt ?? item.published ?? null,
                }));

                if (!cancelled) {
                    setBlogs(prev => page === 1 ? mapped : [...prev, ...mapped]);
                    setHasMore(mapped.length === 12); // If less than 12, no more to load
                }
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? String(e));
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        fetchBlogs();
        return () => {
            cancelled = true;
        };
    }, [page]);

    const handleLoadMore = () => setPage(p => p + 1);

    if (loading && page === 1) return <p>Loading blogs…</p>;
    if (error) return <p>Error loading blogs: {error}</p>;

    return (
        <section>
            <div className="cards-container">
                {blogs.map((b) => (
                    <Blogcard
                        key={b.id}
                        title={b.title}
                        imageUrl={b.imageUrl}
                        summary={b.summary}
                        url={b.url}
                        publishedAt={b.publishedAt}
                    />
                ))}
            </div>
            {hasMore && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
                    <button id="load" onClick={handleLoadMore} disabled={loading}>
                        {loading ? 'Loading…' : 'Load More'}
                    </button>
                </div>
            )}
        </section>
    );
}

export default Spaceapi;