// import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Seo from "../components/Seo";
const API_KEY = process.env.API_KEY;

export default function Home({ results }) {
    const router = useRouter();
    //   const [movies, setMovies] = useState();
    //   useEffect(() => {
    //     (async () => {
    //       setMovies(results);
    //     })();
    //   }, []);
    const onClick = (id, title, poster_path) => {
        router.push(
            {
                pathname: `/movies/${id}`,
                query: {
                    title,
                    img: `https://image.tmdb.org/t/p/w500/${poster_path}`,
                },
            },
            `movies/${id}`
        );
    };
    return (
        <div className="container">
            <Seo title="Home" />
            {/* {!movies && <h4>Loading...</h4>} */}
            {results?.map((movie) => (
                <div
                    className="movie"
                    key={movie.id}
                    onClick={() => {
                        onClick(movie.id, movie.title, movie.poster_path);
                    }}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    />
                    <Link href={`/movies/${movie.id}`}>
                        <h4>
                            <a>{movie.original_title}</a>
                        </h4>
                    </Link>
                </div>
            ))}
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie {
                    cursor: pointer;
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

// Server Side Rendering
export async function getServerSideProps() {
    const { results } = await (
        await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        )
    ).json();
    return {
        props: {
            results,
        },
    };
}
