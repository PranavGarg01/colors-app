import React,{Component} from 'react';
import './ColorBox.css';
import {Link} from 'react-router-dom';
import { CopyToClipboard } from "react-copy-to-clipboard";
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
        const {name, color} = this.props;
        return(
            <CopyToClipboard text={color} onCopy={this.changeCopyState}>
            <div className="ColorBox" style={{backgroundColor : color}}>
                <div className={`copy-overlay ${this.state.copied ? 'show' : null}`} style={{backgroundColor : color}} />
                <div className={`copy-msg ${this.state.copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p>{color}</p>
                </div>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>
                            {name}
                        </span>
                    </div>
                    
                    <button className='copy-button'>Copy</button>
                    
                </div>
                <Link to='/' onClick={(e)=> e.stopPropagation()}>
                <span className='see-more'>{more}</span>
                </Link>
            </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;