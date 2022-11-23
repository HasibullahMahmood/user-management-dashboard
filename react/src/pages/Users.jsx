import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Container, Typography, Button, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import UsersTable from '../components/UsersTable';
import { loadUsers } from '../store/actions';

const useStyles = makeStyles((theme) => ({
	dashboard: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(3),
	},
	cardHeader: {
		padding: theme.spacing(3),
	},
	cardHeaderAction: {
		marginTop: theme.spacing(0),
		marginRight: theme.spacing(0),
	},
	circularProgress: {
		display: 'flex',
		justifyContent: 'center',
	},
	cardContent: {
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px !important`,
	},
	alert: {
		marginTop: theme.spacing(2),
	},
}));

const Users = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loading, error, list: users } = useSelector((state) => state.users);

	useEffect(() => {
		dispatch(loadUsers());
	}, [dispatch]);

	return (
		<main>
			<Container>
				<Typography variant="h4" component="h1" className={classes.dashboard}>
					Dashboard
				</Typography>

				{!loading && (
					<Card elevation={3}>
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
							classes={{ action: classes.cardHeaderAction }}
							className={classes.cardHeader}
						/>
						<Divider />
						<CardContent className={classes.cardContent}>
							{users?.length !== 0 ? (
								<UsersTable users={users} />
							) : (
								<Typography align="center">No user found!</Typography>
							)}
						</CardContent>
					</Card>
				)}
				{loading && (
					<div className={classes.circularProgress}>
						<CircularProgress />
					</div>
				)}
				{error && (
					<Alert severity="error" className={classes.alert}>
						Error: {error}
					</Alert>
				)}
			</Container>
		</main>
	);
};

export default Users;
