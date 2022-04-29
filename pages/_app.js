import Navibar from "../components/Navibar";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Navibar></Navibar>

            <Component {...pageProps} />

            <style jsx global>
                {`
                    a {
                        color: coral;
                    }
                `}
            </style>
        </>
    );
}
