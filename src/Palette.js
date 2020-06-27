import React,{Component} from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import "./Palette.css";

class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level : 500,
            format : "hex"
        }
        this.changeLevel = this.changeLevel.bind(this);
        this.handleChange = this.handleChange.bind(this)
    }
    changeLevel(level) {
        this.setState({
            level
        })
    }
    handleChange(format) {
        this.setState({
            format
        })
    }
    render() {
        const {colors,paletteName,emoji} = this.props.palette;
        const {level,format} = this.state;
        const colorBox = colors[level].map((color,index) => (
            <ColorBox key={color.id} color={color[format]} name={color.name}/>
        ));
        return(
            <div className="Palette">
                <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.handleChange}/>
                <div className="Palette-colors">
                   {colorBox}
                </div>
                <footer className="Palette-footer">
                    {paletteName}
                    <span className="emoji">{emoji}</span>
                </footer>
            </div>
        );
    }
}

export default Palette;