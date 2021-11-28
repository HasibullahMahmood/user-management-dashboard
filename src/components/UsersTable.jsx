import React, { useState } from 'react';
import { TableBody, TableRow, TableCell, Button, makeStyles } from '@material-ui/core';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import useTable from '../hooks/useTable';
import useSuccessAlert from '../hooks/useSuccessAlert';
import { deleteUser } from '../store/actions';

const headCells = [
	{ id: 'id', label: 'Id' },
	{ id: 'name', label: 'Name' },
	{ id: 'username', label: 'Username' },
	{ id: 'email', label: 'Email' },
	{ id: 'city', label: 'City' },
	{ id: 'edit', label: 'Edit', disableSorting: true, align: 'center' },
	{ id: 'delete', label: 'Delete', disableSorting: true, align: 'center' },
];

const useStyles = makeStyles((theme) => ({
	editBtn: {
		backgroundColor: theme.palette.warning.main,
		color: 'white',
		'&:hover': {
			backgroundColor: theme.palette.warning.dark,
		},
	},
	deleteBtn: {
		backgroundColor: theme.palette.error.main,
		color: 'white',
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
	},
	sweetAlert: {
		'& *': {
			fontFamily: theme.typography.fontFamily,
		},
	},
	alertButtons: {
		display: 'flex',
		gap: theme.spacing(1),
		justifyContent: 'center',
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
}));

export default function UsersTable({ users }) {
	const [warnDelete, setWarnDelete] = useState({ open: false, useId: null });
	const classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { setOpen: setSuccessAlertOpen, SuccessAlert } = useSuccessAlert();
	const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(users, headCells);

	const cancelDeleteHandler = () => {
		setWarnDelete({ open: false, userId: null });
	};

	const onWarnDeleteConfirmed = () => {
		const userId = warnDelete.userId;
		setWarnDelete({ open: false, useId: null });
		deleteUserHandler(userId);
	};

	const deleteUserHandler = async (userId) => {
		const response = await dispatch(deleteUser(userId));

		if (response.type === 'users/deleteUser/fulfilled') {
			setSuccessAlertOpen(true);
		}
	};

	const onSuccessAlertConfirmed = () => {
		setSuccessAlertOpen(false);
	};

	const editBtnHandler = (userId) => {
		navigate(`/edit-user/${userId}`);
	};
	return (
		<div>
			<TblContainer>
				<TblHead />
				<TableBody>
					{recordsAfterPagingAndSorting()?.map((item) => (
						<TableRow key={item.id}>
							<TableCell>{item.id}</TableCell>
							<TableCell>{item?.name}</TableCell>
							<TableCell>{item?.username}</TableCell>
							<TableCell>{item?.email}</TableCell>
							<TableCell>{item?.address?.city}</TableCell>
							<TableCell align="center">
								<Button
									variant="contained"
									disableElevation
									className={classes.editBtn}
									size="small"
									onClick={editBtnHandler.bind(null, item.id)}
								>
									Edit
								</Button>
							</TableCell>
							<TableCell align="center">
								<Button
									variant="contained"
									disableElevation
									className={classes.deleteBtn}
									size="small"
									onClick={() => {
										setWarnDelete({ open: true, userId: item.id });
									}}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TblContainer>
			<TblPagination />
			{warnDelete.open ? (
				<SweetAlert
					warning
					title="Warning!"
					customClass={classes.sweetAlert}
					showConfirm={false}
					onConfirm={() => {}}
				>
					Are you sure you want to delete this user?
					<div className={classes.alertButtons}>
						<Button variant="outlined" onClick={cancelDeleteHandler}>
							Cancel
						</Button>
						<Button variant="contained" color="secondary" onClick={onWarnDeleteConfirmed}>
							Yes, delete it!
						</Button>
					</div>
				</SweetAlert>
			) : null}
			<SuccessAlert onConfirm={onSuccessAlertConfirmed} text="The user is deleted successfully" />
		</div>
	);
}
