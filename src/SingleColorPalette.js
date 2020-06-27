import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./SingleColorPalette.css";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

const Styles = {
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
	},
	GoBack : {
		width : "20%",
        height: props => props.paletteId ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
		verticalAlign: "top",
		backgroundColor: "black",
	},
	copyButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        opacity: 1
	},
	noDeco : {
		textDecoration : "none"
	}
}
class SingleColorPalette extends Component {
	constructor(props) {
		super(props);

		this.state = {
			format: "hex",
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(format) {
		this.setState({
			format,
		});
	}
	gatherShades(palette, colorId) {
		let shades = [];
		let allColors = palette.colors;

		for (let key in allColors) {
			shades = shades.concat(
				allColors[key].filter((colors) => colors.id === colorId)
			);
		}
		return shades.slice(1);
	}
	render() {
		const { format } = this.state;
		const { palette, colorId,classes} = this.props;
		const colorShades = this.gatherShades(palette, colorId);
		const colorBoxes = colorShades.map((p) => (
            <ColorBox 
                key={p.name}
                name={p.name} 
                id={p.id} 
                color={p[format]} 
            />
		));
		return (
			<div className={classes.Palette}>
				<Navbar handleChange={this.handleChange} />
				<div className={classes.PaletteColors}>
					{colorBoxes}
					<Link to={`/palette/${palette.id}`} className={classes.noDeco}>
						<div className={classes.GoBack}>
                        <div className={classes.copyButton}>Go Back</div>
                        </div>
					</Link>
				</div>
				<footer className={classes.PaletteFooter}>
					{palette.paletteName}
					<span className={classes.Emoji}>{palette.emoji}</span>
				</footer>
			</div>
		);
	}
}

export default withStyles(Styles)(SingleColorPalette);
