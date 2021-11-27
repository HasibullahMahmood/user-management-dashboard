import { useNavigate } from 'react-router-dom';
import { Container, Card, CardHeader, CardContent, Typography, Box, Button, Divider } from '@material-ui/core';

const Users = () => {
	const navigate = useNavigate();

	return (
		<main>
			<Container>
				<Box mt={5} mb={3}>
					<Typography variant="h4" component="h1">
						Dashboard
					</Typography>
				</Box>
				<Card elevation={4}>
					<CardHeader
						title={
							<Typography variant="h5" component="h2">
								User list
							</Typography>
						}
						action={
							<Button variant="contained" color="primary" onClick={() => navigate('/add-user')}>
								Add New
							</Button>
						}
					/>

					<CardContent>
						<Divider />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
};

export default Users;
