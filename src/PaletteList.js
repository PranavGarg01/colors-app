import React,{Component} from 'react';
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.goToPalette = this.goToPalette.bind(this);
    }
    goToPalette(id){
        this.props.history.push(`/palette/${id}`);
    }
    render() {
        const {classes, palette,deletePalette} = this.props;
        
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Colors App</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                        {palette.map(palette => (
                        <MiniPalette {...palette} handleClick={()=> this.goToPalette(palette.id)} deletePalette={deletePalette}/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);