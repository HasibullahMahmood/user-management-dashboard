import React from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
}));

export default function UserForm(props) {
	const classes = useStyles();
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
				defaultValue=""
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
				defaultValue=""
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
			<div className={classes.buttons}>
				<Button variant="outlined" color="secondary" size="large" onClick={props.cancelHandler}>
					Cancel
				</Button>
				<Button variant="contained" color="primary" size="large" type="submit">
					Submit
				</Button>
			</div>
		</form>
	);
}
