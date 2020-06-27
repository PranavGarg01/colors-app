import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./SingleColorPalette.css";
import Navbar from "./Navbar";
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
		const { palette, colorId } = this.props;
		const colorShades = this.gatherShades(palette, colorId);
		const colorBoxes = colorShades.map((p) => (
			<ColorBox name={p.name} id={p.id} color={p[format]} />
		));
		console.log(colorShades);
		return (
			<div className="SingleColorPalette">
				<Navbar handleChange={this.handleChange} />
				<div className="SingleColorPalette-colors">{colorBoxes}</div>
				<footer className="Palette-footer">
					{palette.paletteName}
					<span className="emoji">{palette.emoji}</span>
				</footer>
			</div>
		);
	}
}

export default SingleColorPalette;
