// Next.js에서 URL에 변수를 받는 방식
// /movies/:id
// id로 변수가 들어옴

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Detail() {
    const router = useRouter();
    const [detail, setDetail] = useState();

    useEffect(() => {
        (async () => {
            const result = await (
                await fetch(`/api/movies/${router.query.id}`)
            ).json();
            setDetail(result.overview);
        })();
    }, []);

    return (
        <div>
            <h4>{router.query.title}</h4>
            <img src={router.query.img}></img>
            {detail}
        </div>
    );
}
