import React, { Component } from "react";
import ColorBox from "./ColorBox";
import './SingleColorPalette.css';
class SingleColorPalette extends Component {
	constructor(props) {
		super(props);

		this.state = {
			format: "hex",
		};
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
		const colorShades = this.gatherShades(
			this.props.palette,
			this.props.colorId
		);
		const colorBoxes = colorShades.map((p) => (
			<ColorBox name={p.name} id={p.id} color={p.hex} />
		));
		console.log(colorShades);
		return (
            <div className="SingleColorPalette">
                <div className="SingleColorPalette-colors">
                    {colorBoxes}
                </div>
            </div>
        );
	}
}

export default SingleColorPalette;
