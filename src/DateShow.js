import React, { Component } from 'react';

class DateShow extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let {showDate,prefix} = this.props;
        const date = showDate.getDate()>9 ? showDate.getDate() : "0" + showDate.getDate();
        let month = showDate.getMonth()+1;
        month = month>9 ? month : '0' + month;
        return (
            <div>
                <div className="show-date">
                    {prefix}{date}.{month}.{showDate.getFullYear()}
                </div>
            </div>
        );
    }
}

export default DateShow;
