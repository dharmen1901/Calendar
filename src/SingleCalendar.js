import React, { Component } from 'react';
import MainCalendar from './Calendar';
import SideBar from './sidebar';
import DateShow from './DateShow'
import PropTypes from 'prop-types';
import moment from 'moment';
import * as utils from './utils';

class Calendar extends Component {
    constructor(props) {
        super(props);
        let defaultDate = this.props.defaultDate;
        let dateSelect =  defaultDate || new Date();
        let viewableMonth = dateSelect.getMonth();
        let viewableYear = dateSelect.getFullYear();
        let inputDate = utils.formatDate(defaultDate);
        this.state = { 
            inputDate:inputDate,
            selectedDate: defaultDate, 
            viewableMonth: viewableMonth, 
            viewableYear: viewableYear, 
            viewableCentury: viewableYear 
        };
    }

    selectDate = (date) =>{
        if(this.props.disabledPicker) 
            return;
        if(this.props.disabled(date))
            return;
        this.setState({
            inputDate: utils.formatDate(date),
            selectedDate:date,
            viewableMonth:date.getMonth(),
            viewableYear:date.getFullYear(),
            viewableCentury:date.getFullYear()
        })
        this.props.onChangeDate(date);
    }

    changeDate=(month,year)=>{
        this.setState({viewableMonth:month,viewableYear:year,viewableCentury:year})
    }

    changeCentury = (century) =>{
        this.setState({viewableCentury:century})
    }

    onChangeInput = (input) =>{
        this.setState({inputDate:input});
        const valid = utils.checkValidDate(input);
        if(valid && !this.props.disabled(valid) )
            this.selectDate(valid)
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
        const selectedMonthYear = selectedDate && selectedDate.getMonth() == viewableMonth && selectedDate.getFullYear() == viewableYear;
        const disabledDate = disabled(new Date(viewableYear,viewableMonth,date))   
        const viewSelectedDate  = selectedDate && selectedMonthYear && selectedDate.getDate()==date ;
        let className = viewSelectedDate ? 'selected' : '';
        className += disabledDate ? ' disabled' : '';
        className += monthType?' out-scope':'';
        return(
            <td 
                key = {date + "/" + viewableMonth}
                onClick={disabledDate?null:()=>this.selectDate(new Date(viewableYear,viewableMonth,date))} 
                className={ className }
            >
                {date}
            </td>)
    }

    render() {
        const {sideMenu,locale,closeDropdown} = this.props
        moment.locale(locale);
        const monthLocale = moment.monthsShort();
        const monArray = monthLocale.map((mon,index)=>({value:index,label:mon}));
        const daysLocale = moment.weekdaysMin();
        const dayArray = daysLocale.slice(1).concat(daysLocale[0]);
        moment.locale("en");
        return (
            <div className="main-calendar calendar-single">
               <div className="menu">
                    
                    {sideMenu && (<SideBar
                        sideMenu = {sideMenu}
                        fromDate = {this.state.selectedDate}
                        selectDate = {this.selectDate}
                    />)}

                    <div className="calendar-without-sidebar">
                        <DateShow 
                            inputDate={this.state.inputDate} 
                            onChangeInput={this.onChangeInput} 
                            disabled = {this.props.disabledPicker}
                        />
                        <MainCalendar
                            monArray = {monArray}
                            dayArray = {dayArray}
                            changeDate = {this.changeDate}
                            viewableMonth={this.state.viewableMonth}
                            viewableYear={this.state.viewableYear}
                            viewableCentury={this.state.viewableCentury}
                            renderDate = {this.renderDate}
                            changeCentury = {this.changeCentury}
                        />
                        <div className="done">
                            <div className="done-button" onClick={closeDropdown}>Done</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    disabled : PropTypes.func,
    sideMenu : PropTypes.array,
    locale : PropTypes.string,
    onChangeDate : PropTypes.func,
    defaultDate : PropTypes.instanceOf(Date),
    disabledPicker : PropTypes.bool,
}

Calendar.defaultProps = {
    disabled : () => false,
    onChangeDate : ()=>{},
    locale : "en",
    disabledPicker : false,
};


class Dropdown extends Component{
    constructor(props)
    {
        super(props);
        this.state = {openDropdown:false}
        this.closeDropdown = this.closeDropdown.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
    }

    closeDropdown(){
        this.setState({openDropdown:false});
    }

    toggleDropdown(){
        this.setState({openDropdown:!this.state.openDropdown});
    }

    render(){
        const {openDropdown} = this.state;
        return(
            <div className="drop-down">
                <div className="header" onClick={this.toggleDropdown}>
                    <div>Date: </div>
                    <div>Value</div>
                </div>
                {
                    openDropdown && (
                        <div className="body">
                            <Calendar closeDropdown={this.closeDropdown} {...this.props}/>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Dropdown;
