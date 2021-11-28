import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
// store
import store from './store/index';
// css
import './globals.css';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Users />} />
					<Route path="/add-user" element={<AddUser />} />
					<Route path="/edit-user/:userId" element={<EditUser />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
