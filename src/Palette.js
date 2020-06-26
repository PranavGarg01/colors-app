import React,{Component} from 'react';
import ColorBox from './ColorBox';
import "./Palette.css";
import {generatePalette} from './colorHelpers';
class Palette extends Component {
    render() {
        const colorBox = this.props.colors.map(color => (
            <ColorBox {...color}/>
        ));
        return(
            <div className="Palette">
                <div className="Palette-colors">
                   {colorBox}
                </div>
            </div>
        );
    }
}

export default Palette;