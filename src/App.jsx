import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// pages
import UserList from './pages/user-list/';
import AddEditUser from './pages/add-edit-user/';
// store
import store from './store/index';
// css
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<UserList />} />
					<Route path="/add-user" element={<AddEditUser isAddPage={true} />} />
					<Route path="/edit-user" element={<AddEditUser />} />
				</Routes>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
