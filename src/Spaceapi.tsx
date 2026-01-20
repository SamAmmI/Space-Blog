

import { useEffect, useState } from 'react';
import Blogcard from './Blogcard';

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

    useEffect(() => {
        let cancelled = false;

        async function fetchBlogs() {
            try {
                const check = await fetch('https://api.spaceflightnewsapi.net/v4/blogs/?format=json&limit=10');
                if (!check.ok) throw new Error(`${check.status} ${check.statusText}`);
                const data = await check.json();

                // v4 endpoints usually return an object with `results`, but sometimes an array.
                const items: RawItem[] = Array.isArray(data) ? data : data.results ?? [];

                const mapped: Blog[] = items.map((item: RawItem) => ({
                    id: String(item.id ?? item._id ?? item.slug ?? Math.random()),
                    title: item.title ?? item.name ?? 'Untitled',
                    summary: item.summary ?? item.excerpt ?? item.description ?? '',
                    imageUrl: item.imageUrl ?? item.image_url ?? item.image ?? item.feature_image ?? null,
                    url: item.url ?? item.link ?? item.news_url ?? null,
                    publishedAt: item.published_at ?? item.publishedAt ?? item.published ?? null,
                }));

                if (!cancelled) setBlogs(mapped);
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
    }, []);

    if (loading) return <p>Loading blogs…</p>;
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
        </section>
    );
}

export default Spaceapi;