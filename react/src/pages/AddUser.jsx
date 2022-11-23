import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Container, Typography, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import UserForm from '../components/UserForm';
import useSuccessAlert from '../hooks/useSuccessAlert';
import { addUser } from '../store/actions';

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
	const { setOpen: setAlertOpen, SuccessAlert } = useSuccessAlert();
	const classes = useStyles();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const cancelHandler = () => {
		navigate('/', { replace: true });
	};
	const submitHandler = async (data) => {
		const response = await dispatch(addUser(data));
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
			<SuccessAlert onConfirm={successAlertConfirmHandler} text="The user is added successfully" />
		</main>
	);
};

export default AddUser;
