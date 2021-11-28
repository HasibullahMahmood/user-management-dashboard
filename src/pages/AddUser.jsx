import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import { Container, Typography, Divider } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

import UserForm from '../components/UserForm';
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
	sweetAlert: {
		'& > h2, & > div': {
			fontFamily: theme.typography.fontFamily,
		},
	},
	sweetAlertBtn: {
		backgroundColor: theme.palette.primary.main,
		color: 'white',
		padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
		borderRadius: theme.spacing(0.5),
		textDecoration: 'none',
		fontFamily: theme.typography.fontFamily,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
	},
}));

const AddUser = () => {
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);
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
			setShowSuccessAlert(true);
		}
	};

	const successAlertConfirmHandler = () => {
		setShowSuccessAlert(false);
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
			{showSuccessAlert && (
				<SweetAlert
					success
					title="Congratulations!"
					onConfirm={successAlertConfirmHandler}
					confirmBtnCssClass={classes.sweetAlertBtn}
					focusConfirmBtn
					customClass={classes.sweetAlert}
				>
					The user is added successfully
				</SweetAlert>
			)}
		</main>
	);
};

export default AddUser;
