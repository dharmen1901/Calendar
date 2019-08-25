import React, { Component } from 'react';

class SideBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        const {sideMenu,selectDate} = this.props;
        return (
            <div className="side-menu">
                <div className="side-menu-table">
                    {sideMenu.map(row=>{
                        return <div className="side-menu-item" onClick={()=>selectDate(row.from)}>{row.label}</div>
                    })}
                </div>
            </div>
        );
    }
}

export default SideBar;
