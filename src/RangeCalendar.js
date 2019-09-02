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
        let today = new Date();
        let dateSelectFrom =  this.props.defaultFromDate || today;
        let viewableMonth = dateSelectFrom.getMonth();
        let viewableYear = dateSelectFrom.getFullYear();
        this.state = { 
            inputFromDate:utils.formatDate(this.props.defaultFromDate),
            inputToDate:utils.formatDate(this.props.defaultToDate),
            fromDate: this.props.defaultFromDate, 
            toDate:this.props.defaultToDate, 
            viewableMonth: viewableMonth, 
            viewableYear: viewableYear,
            viewableCentury: viewableYear,
        };
        this.selecting = this.props.disabledFromPicker ? 1 : 0;
    }

    selectFromDate = (date) =>{
        if(this.props.disabledFromPicker) 
            return;
        if(this.state.toDate && this.state.toDate<date)
            return;
        if(this.props.disabled(date))
            return;
        this.setState({
            fromDate:date,
            inputFromDate:utils.formatDate(date),
            viewableMonth:date.getMonth(),
            viewableYear:date.getFullYear(),
            viewableCentury:date.getFullYear(),
        })
        if(!this.props.disabledToPicker) this.selecting = 1;
        this.props.onChangeFromDate(date);
    }

    selectSideMenuDate = (date,toDate) => {
        let newState = {}

        if(!this.props.disabledFromPicker) 
        {
            newState.fromDate = date;
            newState.inputFromDate = utils.formatDate(date);
            newState.viewableMonth = date.getMonth();
            newState.viewableYear = date.getFullYear();
            newState.viewableCentury = date.getFullYear();
        }
        if(!this.props.disabledToPicker) 
        {
            newState.toDate = toDate;
            newState.inputToDate = utils.formatDate(toDate);
            if(this.props.disabledFromPicker)
            {
                newState.viewableMonth = toDate.getMonth();
                newState.viewableYear = toDate.getFullYear();
                newState.viewableCentury = toDate.getFullYear();
            }
        }
        let compareFrom = newState.fromDate || this.state.fromDate;
        let compareTo = newState.toDate || this.state.toDate;
        if(!compareFrom || !compareTo || compareFrom<=compareTo)
        {
            if(compareFrom && this.props.disabled(compareFrom))
                return;
            if(compareTo && this.props.disabled(compareTo))
                return;
            this.setState(newState)
        }
    }

    selectToDate = (date) =>{
        if(this.props.disabledToPicker) 
            return;
        if(this.state.fromDate && this.state.fromDate>date)
            return;
        if(this.props.disabled(date))
            return;
        this.setState({
            toDate:date,
            inputToDate:utils.formatDate(date),
            viewableMonth:date.getMonth(),
            viewableYear:date.getFullYear(),
            viewableCentury:date.getFullYear(),
        })
        if(!this.props.disabledFromPicker) 
            this.selecting = 0;
        this.props.onChangeToDate(date);
    }

    selectDate = (date) =>{
        if(this.selecting==0)
        {
            if(!this.state.toDate || date<=this.state.toDate)
                this.selectFromDate(date); 
            else
                this.selectToDate(date)
        }
        else
        {
            if(!this.state.fromDate || date>=this.state.fromDate)
                this.selectToDate(date); 
            else
                this.selectFromDate(date)
        }
    }

    changeDate=(month,year)=>{
        this.setState({viewableMonth:month,viewableYear:year,viewableCentury:year})
    }

    changeCentury = (century) =>{
        this.setState({viewableCentury:century})
    }

    onChangeFromInput = (input) =>{
        this.setState({inputFromDate:input});
        const valid = utils.checkValidDate(input);
        if(valid && !this.props.disabled(valid) )
            this.selectFromDate(valid)
    }

    onChangeToInput = (input) =>{
        this.setState({inputToDate:input});
        const valid = utils.checkValidDate(input);
        if(valid && !this.props.disabled(valid) )
            this.selectToDate(valid)
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
        
        const toMonth = toDate && toDate.getMonth(); const toOfDate = toDate && toDate.getDate(); const toYear = toDate && toDate.getFullYear();
        const fromMonth = fromDate && fromDate.getMonth(); const fromOfDate = fromDate&& fromDate.getDate(); const fromYear = fromDate&&fromDate.getFullYear();

        const greaterFrom = fromMonth && new Date(fromYear,fromMonth,fromOfDate)  <= new Date(viewableYear,viewableMonth,date);
        const lessTo  = toDate && new Date(toYear,toMonth,toOfDate)  >= new Date(viewableYear,viewableMonth,date);
        
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
                key = {date + "/" + viewableMonth}
                onClick={disabledDate?null:()=>this.selectDate(new Date(viewableYear,viewableMonth,date))} 
                className={ className }
            >
                {date}
            </td>
        )
    }

    render() {
        const {locale,closeDropdown,sideMenu,disabledFromPicker,disabledToPicker} = this.props;
        moment.locale(locale);
        const monthLocale = moment.monthsShort();
        const monArray = monthLocale.map((mon,index)=>({value:index,label:mon}));
        const daysLocale = moment.weekdaysMin();
        const dayArray = daysLocale.slice(1).concat(daysLocale[0]);
        moment.locale("en");
        return (
            <div className="main-calendar calendar-range">

                <div className="menu">

                    {sideMenu && (<SideBar
                        fromDate = {this.state.fromDate}
                        toDate = {this.state.toDate}
                        sideMenu = {sideMenu}
                        selectDate = {this.selectSideMenuDate}
                    />)}

                    <div className="calendar-without-sidebar">
                        
                        <DateShow 
                            inputDate= {this.state.inputFromDate} 
                            disabled = {disabledFromPicker}
                            onChangeInput={this.onChangeFromInput} 
                            prefix={"From:"}
                        />

                        <DateShow 
                            inputDate={this.state.inputToDate}
                            disabled = {disabledToPicker} 
                            onChangeInput={this.onChangeToInput} 
                            prefix={"To:"}
                        />

                        <MainCalendar
                            monArray = {monArray}
                            changeDate = {this.changeDate}
                            viewableMonth={this.state.viewableMonth}
                            viewableYear={this.state.viewableYear}
                            renderDate = {this.renderDate}
                            dayArray = {dayArray}
                            viewableCentury={this.state.viewableCentury}
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

Calendar.defaultProps = {
    locale : "en",
    disabled : () => false,
    onChangeFromDate : ()=>{},
    onChangeToDate : ()=>{},
    disabledFromPicker : false,
    disabledToPicker : false,
};

Calendar.propTypes = {
    locale : PropTypes.string,
    disabled : PropTypes.func,
    sideMenu : PropTypes.array,
    defaultToDate : PropTypes.instanceOf(Date),
    defaultFromDate : PropTypes.instanceOf(Date),
    onChangeFromDate : PropTypes.func,
    onChangeToDate : PropTypes.func,
    disabledFromPicker : PropTypes.bool,
    disabledToPicker : PropTypes.bool,
}

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
