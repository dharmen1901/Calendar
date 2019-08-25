import React, { Component } from 'react';
import MainCalendar from './Calendar';
import SideBar from './sidebar';
import DateShow from './DateShow'
import PropTypes from 'prop-types';

class Calendar extends Component {
    constructor(props) {
        super(props);
        let viewableMonth = this.props.defaultFromDate.getMonth();
        let viewableYear = this.props.defaultToDate.getFullYear();
        this.state = { fromDate: this.props.defaultFromDate, toDate:this.props.defaultToDate, viewableMonth: viewableMonth, viewableYear: viewableYear };
        this.selecting=0;
    }

    selectFromDate = (date) =>{
        this.setState({fromDate:date,viewableMonth:date.getMonth(),viewableYear:date.getFullYear()})
        this.selecting = 1;
        this.props.onChangeFromDate(date);
    }

    selectSideMenuDate = (date) => {
        this.setState({fromDate:date,toDate:new Date(),viewableMonth:date.getMonth(),viewableYear:date.getFullYear()})
    }

    selectToDate = (date) =>{
        this.setState({toDate:date})
        this.selecting = 0;
        this.props.onChangeToDate(date);
    }

    selectDate = (date) =>{
        if(this.selecting==0)
        {
            if(date<=this.state.toDate)
                this.selectFromDate(date); 
            else
                this.selectToDate(date)
        }
        else
        {
            if(date>=this.state.fromDate)
                this.selectToDate(date); 
            else
                this.selectFromDate(date)
        }
        console.log("shruti")
    }

    changeDate=(month,year)=>{
        this.setState({viewableMonth:month,viewableYear:year})
    }

    renderDate = (date,monthType) => {
        let {viewableMonth,viewableYear,fromDate,toDate} = this.state;
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
        let disabledDate = disabled(new Date(viewableYear,viewableMonth,date))   
        
        const toMonth = toDate.getMonth(); const toOfDate = toDate.getDate(); const toYear = toDate.getFullYear();
        const fromMonth = fromDate.getMonth(); const fromOfDate = fromDate.getDate(); const fromYear = fromDate.getFullYear();

        const greaterFrom = new Date(fromYear,fromMonth,fromOfDate)  <= new Date(viewableYear,viewableMonth,date);
        const lessTo  = new Date(toYear,toMonth,toOfDate)  >= new Date(viewableYear,viewableMonth,date);
        
        const to  = toMonth  == viewableMonth &&  toYear == viewableYear && toOfDate ==date ;
        const from = fromMonth == viewableMonth &&  fromYear == viewableYear && fromOfDate == date;
        const today = new Date().getDate() == date && new Date().getMonth() == viewableMonth && new Date().getFullYear() == viewableYear;
        let className = greaterFrom && lessTo ? 'selected ' : '';
        className += disabledDate ? 'disabled ' : '';
        className += today ? 'today ' : '';
        className += to?'range-end ':'';
        className += from?'range-start ':'';
        className += monthType?' out-scope':'';
        return(
            <td 
                onClick={disabledDate?null:()=>this.selectDate(new Date(viewableYear,viewableMonth,date))} 
                className={ className }
            >
                {date}
            </td>
        )
    }

    render() {
        const {dayArray,monArray,sideMenu} = this.props
        return (
            <div className="main-calendar calendar-range">

                <div className="menu">

                    {sideMenu && (<SideBar
                        sideMenu = {sideMenu}
                        selectDate = {this.selectDate}
                    />)}

                    <div className="calendar-without-sidebar">
                        <DateShow showDate={this.state.fromDate} monArray = {monArray} prefix={"From: "}/>
                        <DateShow showDate={this.state.toDate} monArray = {monArray} prefix={"To: "}/>

                        <MainCalendar
                            monArray = {monArray}
                            changeDate = {this.changeDate}
                            viewableMonth={this.state.viewableMonth}
                            viewableYear={this.state.viewableYear}
                            renderDate = {this.renderDate}
                            dayArray = {dayArray}
                        />
                    </div>

                </div>

            </div>
        );
    }
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
    onChangeFromDate : ()=>{},
    defaultFromDate : new Date(),
    onChangeToDate : ()=>{},
    defaultToDate : new Date(),
};

Calendar.propTypes = {
    dayArray : PropTypes.array,
    monArray : PropTypes.array,
    disabled : PropTypes.func,
    sideMenu : PropTypes.array,
    defaultToDate : PropTypes.date,
    defaultFromDate : PropTypes.date,
    onChangeFromDate : PropTypes.func,
    onChangeToDate : PropTypes.func
}

export default Calendar;
