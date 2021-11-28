import React from 'react';
import { TableBody, TableRow, TableCell, Button, makeStyles } from '@material-ui/core';

import useTable from '../hooks/useTable';

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
}));

export default function UsersTable({ users }) {
	const classes = useStyles();
	const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(users, headCells);
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
								<Button variant="contained" disableElevation className={classes.editBtn} size="small">
									Edit
								</Button>
							</TableCell>
							<TableCell align="center">
								<Button variant="contained" disableElevation className={classes.deleteBtn} size="small">
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TblContainer>
			<TblPagination />
		</div>
	);
}
