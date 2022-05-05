// Next.js에서 URL에 변수를 받는 방식
// /movies/:id
// id로 변수가 들어옴

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Seo from "../../components/Seo";

export default function Detail() {
    const router = useRouter();
    const [detail, setDetail] = useState();

    useEffect(() => {
        (async () => {
            if(Object.keys(router.query).length){
                // 처음에는 Router이 작동하지 않기에, query가 비어있음
                // 이런 경우 fetch를 하면 오류가 나므로, 스킵함.
                // JS가 실행된 이후엔 router.query가 업데이트 되므로
                // 그때 useEffect가 다시 실행되면서 Detail을 불러옴
                const result = await (
                    await fetch(`/api/movies/${router.query.id}`)
                ).json();
                setDetail(result.overview);
            }
        })();
    }, [router.query]);

    return (
        <div>
            <Seo title={router.query.title}></Seo>
            <h4>{router.query.title}</h4>
            <img src={router.query.img}></img>
            {detail}
        </div>
    );
}
