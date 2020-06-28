import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm,TextValidator } from "react-material-ui-form-validator";

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
			currentColor : 'teal',
			newName : '',
			colors : [{
				color : "blue",
				name : "Bluey"
			}]
		};
		this.updateColor = this.updateColor.bind(this);
		this.addNewColor = this.addNewColor.bind(this);
		this.handleNewName = this.handleNewName.bind(this);
		this.handleSave = this.handleSave.bind(this);
	}
	componentDidMount() {
		ValidatorForm.addValidationRule('isColorNameUnique', value => 
			this.state.colors.every(
				({name}) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule('isColorUnique', value => 
			this.state.colors.every(
				({color}) => color !== this.state.currentColor
			)
		);
		
	}
	updateColor(newColor) {
		this.setState({
			currentColor : newColor.hex
		})
		
	}
	addNewColor() {
		const newColor = {
			color : this.state.currentColor,
			name : this.state.newName
		}
		this.setState({
			colors : [...this.state.colors,newColor],
			newName : ""
		})
	}
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};
	handleNewName(e) {
		this.setState({
			newName : e.target.value
		})
	}
	handleSave() {
		let newName = "New Test Palette";
		const Palette = {
			paletteName : newName,
			id: newName.toLowerCase().replace(/ /g,"-"),
			colors : this.state.colors
		};
		this.props.savePalette(Palette);
		this.props.history.push("/");
	}
	render() {
		const { classes } = this.props;
		const { open,colors,currentColor,newName } = this.state;

		return (
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position="fixed"
					color='default'
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
						<Button variant='contained' color='primary' onClick={this.handleSave}>SAVE</Button>
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
							value={newName}
							validators={['required', 'isColorNameUnique','isColorUnique']}
							errorMessages={['this field is required', 'Color Name already used','Color already in the Palette']}
						/>
						<Button
							variant="contained"
							color="primary"
							type='submit'
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
					{colors.map((color) => (
						<DraggableColorBox color={color.color} name={color.name}/>
					))}
				</main>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
