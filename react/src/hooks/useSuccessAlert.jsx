import React, { useState } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	sweetAlert: {
		'& *': {
			fontFamily: theme.typography.fontFamily,
		},
	},
	confirmBtnContainer: {
		display: 'flex',
		justifyContent: 'center',
		margin: theme.spacing(2),
	},
}));

export default function useSuccessAlert() {
	const [open, setOpen] = useState(false);
	const classes = useStyles();
	const SuccessAlert = (props) => (
		<>
			{open ? (
				<SweetAlert
					success
					showConfirm={false}
					title="Congratulations!"
					onConfirm={() => {}}
					customClass={classes.sweetAlert}
				>
					{props.text}
					<div className={classes.confirmBtnContainer}>
						<Button variant="contained" color="primary" onClick={props.onConfirm}>
							Ok
						</Button>
					</div>
				</SweetAlert>
			) : null}
		</>
	);
	return { setOpen, SuccessAlert };
}
