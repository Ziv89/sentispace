import { NavBar } from '../components/';
import { Outlet } from 'react-router-dom';

const Root = () => (
	<main>
		<Outlet />
		<NavBar />
	</main>
);

export default Root;
