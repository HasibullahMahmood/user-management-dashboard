import React from 'react';
import { useSelector } from 'react-redux';
import { TextField, Button, makeStyles, CircularProgress } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Alert } from '@material-ui/lab';

const schema = yup.object().shape({
	name: yup.string().required().min(3),
	email: yup.string().required().email(),
});

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		flexDirection: 'Column',
		gap: theme.spacing(2),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
		gap: theme.spacing(1),
	},
	circularProgress: {
		color: 'white',
	},
}));

export default function UserForm(props) {
	const classes = useStyles();
	const { loading, error } = useSelector((state) => state.users);
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) });
	return (
		<form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit(props.submitHandler)}>
			<Controller
				name="name"
				control={control}
				defaultValue={props?.userData?.name || ''}
				render={({ field }) => (
					<TextField
						{...field}
						label="Name"
						variant="outlined"
						error={!!errors.name}
						helperText={errors.name ? errors.name?.message : ''}
						fullWidth
						required
					/>
				)}
			/>
			<Controller
				name="email"
				control={control}
				defaultValue={props?.userData?.email || ''}
				render={({ field }) => (
					<TextField
						{...field}
						label="Email"
						variant="outlined"
						error={!!errors.email}
						helperText={errors.email ? errors.email?.message : ''}
						fullWidth
						required
					/>
				)}
			/>
			{error && <Alert severity="error">Error: {error}</Alert>}
			<div className={classes.buttons}>
				<Button variant="outlined" color="secondary" size="large" onClick={props.cancelHandler}>
					Cancel
				</Button>
				<Button variant="contained" color="primary" size="large" type="submit">
					{loading ? (
						<>
							Submitting <CircularProgress className={classes.circularProgress} size={20} />
						</>
					) : (
						'Submit'
					)}
				</Button>
			</div>
		</form>
	);
}
