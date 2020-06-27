import React,{Component} from 'react';
import './ColorBox.css';
import {Link} from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
import chroma from 'chroma-js'
import {withStyles} from '@material-ui/styles'

const styles = {
    ColorBox : {
        width : "20%",
        height: "25%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        verticalAlign: "top",
        "&:hover button" : {
            opacity: "1",
            transition: '0.5s'
        }
    },
    copyText : {
        color : props => 
            chroma(props.color).luminance() >=0.6 ? "black" : "white",
        
    },
    colorName : {
        color : props =>
            chroma(props.color).luminance() <= 0.6 ? "white" : "black"
    }
}

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
                <div className={`copy-overlay ${this.state.copied ? 'show' : null}`} style={{backgroundColor : color}} />
                <div className={`copy-msg ${this.state.copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p className={classes.copyText}>{color}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span className={classes.colorName}>
                            {name}
                        </span>
                    </div>
                    
                    <button className={`copy-button ${isLight && 'dark-text'}`}>Copy</button>
                    
                </div>
                {(paletteId) && 
                <Link to={`/palette/${paletteId}/${id}`} onClick={(e)=> e.stopPropagation()}>
                <span className={`see-more ${classes.copyText}`}>{more}</span>
                </Link>
                }
            </div>
            </CopyToClipboard>
        );
    }
}

export default withStyles(styles)(ColorBox);