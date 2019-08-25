import React, { Component } from 'react';
import MainCalendar from './Calendar';
import SideBar from './sidebar';
import DateShow from './DateShow'
import PropTypes from 'prop-types';

class Calendar extends Component {
    constructor(props) {
        super(props);
        let defaultDate = this.props.defaultDate;
        let viewableMonth = defaultDate.getMonth();
        let viewableYear = defaultDate.getFullYear();
        this.state = { selectedDate: defaultDate, viewableMonth: viewableMonth, viewableYear: viewableYear };
    }

    selectDate = (date) =>{
        this.setState({selectedDate:date,viewableMonth:date.getMonth(),viewableYear:date.getFullYear()})
        this.props.onChangeDate(date);
    }

    changeDate=(month,year)=>{
        this.setState({viewableMonth:month,viewableYear:year})
    }

    renderDate = (date,monthType) => {
        let {viewableMonth,viewableYear,selectedDate} = this.state;
        const {disabled} = this.props;
        if(monthType=="prev-month"){
            let prevDate = new Date(viewableYear,viewableMonth-1,date);
            viewableMonth = prevDate.getMonth();
            viewableYear = prevDate.getFullYear();
        }
        if(monthType=="next-month"){
            let prevDate = new Date(viewableYear,viewableMonth+1,date);
            viewableMonth = prevDate.getMonth();
            viewableYear = prevDate.getFullYear();
        }
        const selectedMonthYear = selectedDate.getMonth() == viewableMonth && selectedDate.getFullYear() == viewableYear;
        const disabledDate = disabled(new Date(viewableYear,viewableMonth,date))   
        const viewSelectedDate  = selectedMonthYear && selectedDate.getDate()==date ;
        let className = viewSelectedDate ? 'selected' : '';
        className += disabledDate ? ' disabled' : '';
        className += monthType?' out-scope':'';
        return(
            <td 
                onClick={disabledDate?null:()=>this.selectDate(new Date(viewableYear,viewableMonth,date))} 
                className={ className }
            >
                {date}
            </td>)
    }

    render() {
        const {dayArray,monArray,sideMenu} = this.props
        return (
            <div className="main-calendar calendar-single">

                <div className="menu">
                    
                    {sideMenu && (<SideBar
                        sideMenu = {sideMenu}
                        selectDate = {this.selectDate}
                    />)}

                    <div className="calendar-without-sidebar">
                        <DateShow showDate={this.state.selectedDate} monArray = {monArray}/>
                        <MainCalendar
                            monArray = {monArray}
                            dayArray = {dayArray}
                            changeDate = {this.changeDate}
                            selectDate = {this.selectDate}
                            viewableMonth={this.state.viewableMonth}
                            viewableYear={this.state.viewableYear}
                            renderDate = {this.renderDate}
                            selectedDate={this.state.selectedDate}
                        />
                    </div>
                </div>

            </div>
        );
    }
}

Calendar.propTypes = {
    dayArray : PropTypes.array,
    monArray : PropTypes.array,
    disabled : PropTypes.func,
    sideMenu : PropTypes.array,
    onChangeDate : PropTypes.func,
    defaultDate : PropTypes.date
}

Calendar.defaultProps = {
    dayArray : ["Mo","Tu","We","Th","Fr","Sa","Su"] , 
    monArray : [
        {
            label:"Jan",
            value:0
        },{
            label:"Feb",
            value:1
        },{
            label:"Mar",
            value:2
        },{
            label:"Apr",
            value:3
        },
        {
            label:"May",
            value:4
        },
        {
            label:"Jun",
            value:5
        },
        {
            label:"Jul",
            value:6
        },
        {
            label:"Aug",
            value:7
        },
        {
            label:"Sep",
            value:8
        },
        {
            label:"Oct",
            value:9
        },
        {
            label:"Nov",
            value:10
        },
        {
            label:"Dec",
            value:11
        }
    ],
    disabled : () => false,
    onChangeDate : ()=>{},
    defaultDate : new Date(),
};

export default Calendar;
