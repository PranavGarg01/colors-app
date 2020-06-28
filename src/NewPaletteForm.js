import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button,AppBar,Drawer,CssBaseline,Toolbar,IconButton } from "@material-ui/core";
import { ValidatorForm,TextValidator } from "react-material-ui-form-validator";
import DraggableColorList from "./DraggableColorList";
import {arrayMove} from 'react-sortable-hoc';
const drawerWidth = 340;

const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: "none",
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
	content: {
		flexGrow: 1,
		height : 'calc(100vh - 64px)',
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
});

class NewPaletteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			currentColor: "teal",
			newColorName: "",
			newPaletteName: "",
			colors: [
				{
					color: "blue",
					name: "Bluey",
				},
			],
		};
		this.updateColor = this.updateColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleNewName = this.handleNewName.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
			this.state.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule("isColorUnique", (value) =>
			this.state.colors.every(
				({ color }) => color !== this.state.currentColor
			)
		);
		ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
			this.props.palettes.every(
				({ paletteName }) =>
					paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}));
	};
	updateColor(newColor) {
		this.setState({
			currentColor: newColor.hex,
		});
	}
	addNewColor() {
		const newColor = {
			color: this.state.currentColor,
			name: this.state.newColorName,
		};
		this.setState({
			colors: [...this.state.colors, newColor],
			newName: "",
		});
	}
	removeColor(colorName) {
		this.setState({
			colors: this.state.colors.filter(
				(color) => color.name !== colorName
			),
		});
	}
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};
	handleNewName(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}
	handleSave() {
		let newName = this.state.newPaletteName;
		const Palette = {
			paletteName: newName,
			id: newName.toLowerCase().replace(/ /g, "-"),
			colors: this.state.colors,
		};
		this.props.savePalette(Palette);
		this.props.history.push("/");
	}

	render() {
		const { classes } = this.props;
		const { open, colors, currentColor, newColorName } = this.state;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color="default"
					className={classNames(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar disableGutters={!open}>
						<IconButton
							color="inherit"
							aria-label="Open drawer"
							onClick={this.handleDrawerOpen}
							className={classNames(
								classes.menuButton,
								open && classes.hide
							)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Persistent drawer
						</Typography>
						<ValidatorForm onSubmit={this.handleSave}>
							<TextValidator
								label="Palette Name"
								value={this.state.newPaletteName}
								name="newPaletteName"
								onChange={this.handleNewName}
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={[
									"Enter Palette Name",
									"Name already used",
								]}
							/>
							<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Save Palette
							</Button>
						</ValidatorForm>
					</Toolbar>
				</AppBar>
				<Drawer
					className={classes.drawer}
					variant="persistent"
					anchor="left"
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<IconButton onClick={this.handleDrawerClose}>
							<ChevronLeftIcon />
						</IconButton>
					</div>
					<Divider />
					<Typography variant="h4">Design your Palette</Typography>
					<div>
						<Button variant="contained" color="primary">
							Clear Palette
						</Button>
						<Button variant="contained" color="secondary">
							Random Color
						</Button>
					</div>
					<ChromePicker
						color={currentColor}
						onChangeComplete={this.updateColor}
					/>
					<ValidatorForm onSubmit={this.addNewColor}>
						<TextValidator
							onChange={this.handleNewName}
							value={newColorName}
							name="newColorName"
							validators={[
								"required",
								"isColorNameUnique",
								"isColorUnique",
							]}
							errorMessages={[
								"this field is required",
								"Color Name already used",
								"Color already in the Palette",
							]}
						/>
						<Button
							variant="contained"
							color="primary"
							type="submit"
							style={{ backgroundColor: currentColor }}
						>
							Add Color
						</Button>
					</ValidatorForm>
				</Drawer>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
					})}
				>
					<div className={classes.drawerHeader} />
					<DraggableColorList
						colors={colors}
						removeColor={this.removeColor}
						axis="xy"
						onSortEnd={this.onSortEnd}
					/>
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
