import Navibar from "./Navibar";

const Layout = ({ children }) => {
    return (
        <>
            <Navibar />
            <div>{children}</div>
        </>
    );
};

export default Layout;