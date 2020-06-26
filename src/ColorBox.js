import React,{Component} from 'react';
import './ColorBox.css';
class ColorBox extends Component {
    render() {
        const more = 'more';
        const {name, color} = this.props;
        return(
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
        );
    }
}

export default ColorBox;