import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import "./Palette.css";
import { withStyles } from "@material-ui/styles";

const styles = {
	Palette : {
		height : "100vh",
		overflow: "hidden", /*might need to delete this late */
	},
	PaletteColors : {
		height : "90%",
		fontSize: "0"
	},
	PaletteFooter : {
		backgroundColor: "white",
		height : "5vh",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		fontWeight: "bold",
	},
	Emoji : {
		fontSize: "1.5rem",
		margin: "0 1rem",
		paddingBottom: '.5rem',
	}
	
	
	
}
class Palette extends Component {
	constructor(props) {
		super(props);
		this.state = {
			level: 500,
			format: "hex",
		};
		this.changeLevel = this.changeLevel.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
	changeLevel(level) {
		this.setState({
			level,
		});
	}
	handleChange(format) {
		this.setState({
			format,
		});
	}
	render() {
		const { colors, paletteName, emoji ,id} = this.props.palette;
		const {classes} = this.props;
		const { level, format } = this.state;
		const colorBox = colors[level].map((color, index) => (
            <ColorBox 
            key={color.id} 
            color={color[format]} 
            name={color.name} 
            id={color.id}
            paletteId={id}/>
		));
		return (
			<div className={classes.Palette}>
				<Navbar
					level={level}
					changeLevel={this.changeLevel}
					handleChange={this.handleChange}
				/>
				<div className={classes.PaletteColors}>{colorBox}</div>
				<footer className={classes.PaletteFooter}>
					{paletteName}
					<span className={classes.Emoji}>{emoji}</span>
				</footer>
			</div>
		);
	}
}

export default withStyles(styles)(Palette);
