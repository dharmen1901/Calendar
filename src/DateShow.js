import React, { Component } from 'react';

class DateShow extends Component {
    
    constructor(props) {
        super(props);
    }

    handleChange = (e)=>{
        this.props.onChangeInput(e.target.value)
    }

    render() {
        const {prefix,inputDate,disabled} = this.props;
        return (
            <div>
                <div className="show-date">
                    {prefix}
                    <span>
                        <input 
                            disabled = {disabled}
                            type="text" 
                            onChange={this.handleChange}
                            placeholder="dd/mm/yyyy"
                            value={inputDate}
                        />
                    </span>
                </div>
            </div>
        );
    }
}

export default DateShow;
