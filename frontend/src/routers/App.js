import User from './User';
import Admin from './Admin';
import { useContext } from 'react';
import { Store } from '../Store';

function App() {
	const { state, dispatch: ctxDispatch } = useContext(Store);
	const { userInfo } = state;

	return (
		<>
			{userInfo === null ? (
				<User></User>
			) : userInfo.user.role_id !== 1 ? (
				<Admin></Admin>
			) : (
				<User></User>
			)}
		</>
	);
}

export default App;
