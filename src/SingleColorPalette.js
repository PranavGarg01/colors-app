import React, { Component } from "react";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import Styles from './styles/PaletteStyles';
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
