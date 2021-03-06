import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import {
	Button,
	Drawer,
	IconButton,
	Divider,
	Typography
} from "@material-ui/core";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import styles from "./styles/NewPaletteFormStyles";
import seedColors from './seedColors';

class NewPaletteForm extends Component {
	static defaultProps = {
		maxColors: 20,
	};
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			colors: seedColors[0].colors,
		};

		this.addNewColor = this.addNewColor.bind(this);
		this.handleSave = this.handleSave.bind(this);
		this.removeColor = this.removeColor.bind(this);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.clearPalette = this.clearPalette.bind(this);
		this.randomColor = this.randomColor.bind(this);
	}
	
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ colors }) => ({
			colors: arrayMove(colors, oldIndex, newIndex),
		}));
	};
	
	addNewColor(newColor) {
		this.setState({
			colors: [...this.state.colors, newColor],
		});
	}
	removeColor(colorName) {
		this.setState({
			colors: this.state.colors.filter(
				(color) => color.name !== colorName
			),
		});
	}
	clearPalette() {
		this.setState({
			colors: [],
		});
	}
	randomColor() {
		const allColors = this.props.palettes.map((p) => p.colors).flat();
		var rand = Math.floor(Math.random() * allColors.length);
		const randomColor = allColors[rand];
		this.setState({ colors: [...this.state.colors, randomColor] });
	}
	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};
	
	handleSave(newName) {
		const Palette = {
			paletteName: newName,
			id: newName.toLowerCase().replace(/ /g, "-"),
			colors: this.state.colors,
		};
		this.props.savePalette(Palette);
		this.props.history.push("/");
	}
	render() {
		const { classes, maxColors,palettes } = this.props;
		const { open, colors } = this.state;
		const isPaletteFull = colors.length >= maxColors;
		return (
			<div className={classes.root}>
				<PaletteFormNav
					open={open}
					classes={classes}
					palettes={palettes}
					handleSave={this.handleSave}
					handleDrawerOpen={this.handleDrawerOpen}
				/>
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
					<div className={classes.container}>
					<Typography variant="h4" gutterBottom>Design your Palette</Typography>
					<div className={classes.buttons}>
						<Button
							variant="contained"
							color="primary"
							onClick={this.clearPalette}
							className={classes.button}
						>
							Clear Palette
						</Button>
						<Button
							variant="contained"
							color="secondary"
							onClick={this.randomColor}
							disabled={isPaletteFull}
							className={classes.button}
						>
							Random Color
						</Button>
					</div>
					<ColorPickerForm 
						isPaletteFull={isPaletteFull}
						addNewColor={this.addNewColor} 
						colors={colors}
					/>
					</div>
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
