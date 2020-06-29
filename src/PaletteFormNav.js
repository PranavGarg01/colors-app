import React, { Component } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import PaletteMetaForm from './PaletteMetaForm';
import styles from "./styles/PaletteFormNavStyles";

class PaletteFormNav extends Component {
	constructor(props) {
		super(props);

		this.state = { newPaletteName: "", open: false };
		this.handleNewName = this.handleNewName.bind(this);
		this.handleClickOpen = this.handleClickOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	handleNewName(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}
	handleClickOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
    };
	render() {
		const { classes, open } = this.props;
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
							onClick={this.props.handleDrawerOpen}
							className={classNames(
								classes.menuButton,
								open && classes.hide
							)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" noWrap>
							Create New Palette
						</Typography>
					</Toolbar>
					<div className={classes.navBtns}>
						<PaletteMetaForm
							handleSave={this.props.handleSave}
							palettes={this.props.palettes}
							open={this.state.open}
							handleClickOpen={this.handleClickOpen}
							handleClose={this.handleClose}
						/>
						<Link to="/" style={{textDecoration:"none"}}>
							<Button variant="contained" color="secondary" className={classes.button}>
								Go Back
							</Button>
						</Link>
						<Button
							variant="contained"
							className={classes.button}
							color="primary"
							onClick={this.handleClickOpen}
						>
							Save
						</Button>
					</div>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
