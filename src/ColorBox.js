import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from 'chroma-js'
import {withStyles} from '@material-ui/styles'
import styles from './styles/ColorBoxStyles'

class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied : false
        }
        this.changeCopyState = this.changeCopyState.bind(this);
    }
    changeCopyState() {
        this.setState({
            copied : true
        },
            () => {
                setTimeout(() => {
                    this.setState({
                        copied : false
                    })
                }, 1500);
            }
        )
    }
    render() {
        const more = 'more';
        const {name, color,id,paletteId,classes} = this.props;
        const isDark = chroma(color).luminance() <= 0.6;
        const isLight = chroma(color).luminance() >= 0.6;
        return(
            <CopyToClipboard text={color} onCopy={this.changeCopyState}>
            <div className={classes.ColorBox} style={{backgroundColor : color}}>
                <div className={`${classes.copyOverlay} ${this.state.copied ? classes.showOverlay : null}`} style={{backgroundColor : color}} />
                <div className={`${classes.copyMessage} ${this.state.copied && classes.showMessage}`}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{color}</p>
                </div>
                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>
                            {name}
                        </span>
                    </div>
                    
                    <button className={`${classes.copyButton} ${classes.copyText}`}>Copy</button>
                    
                </div>
                {(paletteId) && 
                <Link to={`/palette/${paletteId}/${id}`} onClick={(e)=> e.stopPropagation()}>
                <span className={`${classes.seeMore} ${classes.copyText}`}>{more}</span>
                </Link>
                }
            </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);