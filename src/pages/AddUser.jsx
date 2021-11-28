import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Container, Typography, Button, Divider, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import UserForm from '../components/UserForm';

const useStyles = makeStyles((theme) => ({
	dashboard: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(3),
	},
	cardHeader: {
		padding: theme.spacing(3),
	},
	circularProgress: {
		display: 'flex',
		justifyContent: 'center',
	},
	cardContent: {
		padding: theme.spacing(3),
	},
}));

const AddUser = () => {
	const classes = useStyles();
	const navigate = useNavigate();

	const cancelHandler = () => {
		navigate('/', { replace: true });
	};
	const submitHandler = (data) => {
		console.log(data);
	};
	return (
		<main>
			<Container maxWidth="md">
				<Typography variant="h4" component="h1" className={classes.dashboard}>
					Dashboard
				</Typography>

				<Card elevation={3}>
					<CardHeader
						title={
							<Typography variant="h5" component="h2">
								Add user
							</Typography>
						}
						classes={{ action: classes.cardHeaderAction }}
						className={classes.cardHeader}
					/>
					<Divider />
					<CardContent className={classes.cardContent}>
						<UserForm cancelHandler={cancelHandler} submitHandler={submitHandler} />
					</CardContent>
				</Card>
			</Container>
		</main>
	);
};

export default AddUser;
