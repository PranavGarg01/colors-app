import React,{Component} from 'react';
import './ColorBox.css';
import { CopyToClipboard } from "react-copy-to-clipboard";
class ColorBox extends Component {
    render() {
        const more = 'more';
        const {name, color} = this.props;
        return(
            <CopyToClipboard text={color}>
            <div className="ColorBox" style={{backgroundColor : color}}>
                <div className='copy-container'>
                    <div className='box-content'>
                        <span>
                            {name}
                        </span>
                    </div>
                    
                    <button className='copy-button'>Copy</button>
                    
                </div>
                <span className='see-more'>{more}</span>
            </div>
            </CopyToClipboard>
        );
    }
}

export default ColorBox;