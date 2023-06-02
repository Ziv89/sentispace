import NavBar from '../components/nav-bar/NavBar';
import { Outlet } from 'react-router-dom';

const Root = () => (
    <>
        <Outlet />
        <NavBar />
    </>
);

export default Root;
