import React,{Component} from 'react';
import Palette from './Palette';
import {Link} from 'react-router-dom';
import { withStyles } from "@material-ui/styles";
import MiniPalette from "./MiniPalette";

const styles = {
    root : {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
      },
      nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
      },
      palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
      }
}

class PaletteList extends Component {
    render() {
        const {classes, palette} = this.props;
        
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Colors App</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {palette.map(palette => (
                        <MiniPalette {...palette} />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PaletteList);