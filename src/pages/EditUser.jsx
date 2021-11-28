import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Container, Typography, Divider, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import UserForm from '../components/UserForm';
import useSuccessAlert from '../hooks/useSuccessAlert';
import { fetchUserById, updateUser } from '../store/actions';

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
	alert: {
		marginTop: theme.spacing(2),
	},
}));

const EditUser = () => {
	const classes = useStyles();
	const navigate = useNavigate();
	const { userId } = useParams();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.users.list.find((user) => +user.id === +userId));
	const { error } = useSelector((state) => state.users);
	const { setOpen: setAlertOpen, SuccessAlert } = useSuccessAlert();

	useEffect(() => {
		if (!user) {
			dispatch(fetchUserById(userId));
		}
	}, [dispatch, userId, user]);

	const cancelHandler = () => {
		navigate('/', { replace: true });
	};

	const submitHandler = async (data) => {
		const response = await dispatch(updateUser({ ...data, id: userId }));
		if (response?.meta?.requestStatus === 'fulfilled') {
			// sweet alert success
			setAlertOpen(true);
		}
	};

	const successAlertConfirmHandler = () => {
		setAlertOpen(false);
		navigate('/');
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
								Edit user
							</Typography>
						}
						classes={{ action: classes.cardHeaderAction }}
						className={classes.cardHeader}
					/>
					<Divider />
					<CardContent className={classes.cardContent}>
						{user ? (
							<UserForm cancelHandler={cancelHandler} submitHandler={submitHandler} userData={user} />
						) : (
							<div className={classes.circularProgress}>
								<CircularProgress />
							</div>
						)}
					</CardContent>
				</Card>
				{error && (
					<Alert severity="error" className={classes.alert}>
						Error: {error}
					</Alert>
				)}
			</Container>
			<SuccessAlert onConfirm={successAlertConfirmHandler} text="The user is updated successfully" />
		</main>
	);
};

export default EditUser;
