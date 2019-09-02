import React, { Component } from 'react';

class SideBar extends Component {
    
    constructor(props) {
        super(props);
    }

    compareDate = (date1,date2) =>{
        return date1.getDate() == date2.getDate() &&
            date1.getMonth() == date2.getMonth() &&
            date1.getFullYear() == date2.getFullYear(); 
    }

    render() {
        const {sideMenu,selectDate,fromDate,toDate} = this.props;
        return (
            <div className="side-menu">
                <div className="side-menu-table">
                    {sideMenu.map( (row,index) =>{
                        const fromSelected = fromDate && this.compareDate(row.from,fromDate);
                        const toSelected = toDate && this.compareDate(row.to,toDate);
                        const selectedFromClass = ( fromSelected ) ? " selected" : "" 
                        const selectedClass = toDate ? (toSelected?selectedFromClass:'') : selectedFromClass 
                        return (
                            <div 
                                key={index} 
                                className={"side-menu-item"+selectedClass} 
                                onClick={()=>selectDate(row.from,row.to)}
                            >
                                    {row.label}
                            </div>)
                    })}
                </div>
            </div>
        );
    }
}

export default SideBar;
