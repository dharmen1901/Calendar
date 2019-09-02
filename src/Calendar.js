import React, { Component } from 'react';

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { showType: 0 }
    }

    gotoPreviousMonth = () => {
        let viewableMonth = this.props.viewableMonth - 1;
        let date = new Date(this.props.viewableYear, viewableMonth);
        this.props.changeDate(date.getMonth(), date.getFullYear());
    }

    gotoNextMonth = () => {
        let viewableMonth = this.props.viewableMonth + 1;
        let date = new Date(this.props.viewableYear, viewableMonth);
        this.props.changeDate(date.getMonth(), date.getFullYear());
    }

    gotoMonth = (month) => {
        this.props.changeDate(month, this.props.viewableYear);
        this.setState({showType : 0})
    }

    gotoYear = (year) => {
        this.props.changeDate(this.props.viewableMonth, year);
    }

    getNoDays = () => 32 - new Date(this.props.viewableYear, this.props.viewableMonth, 32).getDate();

    getDay = () => new Date(this.props.viewableYear, this.props.viewableMonth).getDay();

    renderCalendarArray() {
        const {renderDate} = this.props;
        const calArray = this.getCalendarArray();
        return (
            calArray.map( (tr,index) =>
                <tr className="days-row" key={index}>
                    {tr.map(td => {
                        if(index>3 && td<=16)
                            return renderDate(td,"next-month")
                        if(index==0 && td>8)
                            return renderDate(td,"prev-month")
                        return renderDate(td)
                    })}
                </tr>
            )
        )
    }

    getCalendarArray() {
        let day = this.getDay();
        let lastMonthDays = 32 - new Date(this.props.viewableYear, this.props.viewableMonth-1, 32).getDate();
        const noDays = this.getNoDays();
        let newCount = 1;
        day = day == 0 ? 6 : day - 1;
        let rowArray = [];
        let start = 1;
        let tr = [];
        for (let i = 0; i < day; i++)
            tr.push(lastMonthDays-day+1+i);
        let noCol = day;

        while (start <= noDays) {
            if (noCol == 7) {
                rowArray.push(tr);
                tr = [];
                noCol = 0;
            }
            tr.push(start);
            start++;
            noCol++;
        }
        if (noCol < 7)
            for (let j = noCol; j < 7; j++) 
                tr.push(newCount++);
        rowArray.push(tr);
        if(rowArray.length<6){
            tr=[]
            for (let j = 0; j < 7; j++) 
                tr.push(newCount++);
            rowArray.push(tr);
        }
        return rowArray;
    }

    getMonthName() {
        const {monArray,viewableMonth} = this.props;
        let month = monArray.find(data=>data.value==viewableMonth);
        return month.label;
    }

    renderMonths() {
        const {monArray, viewableMonth} = this.props;
        return (
            <table className="month-table">
                <thead className="month-header header">
                    <tr className="year-header-row">
                        <td>
                        <table><tbody><tr>
                            <td className="prev" onClick={() => this.gotoYear(this.props.viewableYear - 1)}>{"<"}</td>
                            <td className="current-year" onClick={() => this.setState({ showType: 2 })}>{this.props.viewableYear}</td>
                            <td className="next" onClick={() => this.gotoYear(this.props.viewableYear + 1)}>{">"}</td>
                        </tr></tbody></table>
                        </td>
                    </tr>
                </thead>
                <tbody className="month-body body"><tr><td>
                    <table><tbody>
                        <tr className="month-row">
                            {monArray.slice(0, 3).map(row => <td key={row.value} className={row.value==viewableMonth?"selected":""} onClick={() => this.gotoMonth(row.value)}>{row.label}</td>)}
                        </tr>
                        <tr className="month-row">
                            {monArray.slice(3, 6).map(row => <td key={row.value} className={row.value==viewableMonth?"selected":""} onClick={() => this.gotoMonth(row.value)}>{row.label}</td>)}
                        </tr>
                        <tr className="month-row">
                            {monArray.slice(6,9).map(row => <td key={row.value} className={row.value==viewableMonth?"selected":""} onClick={() => this.gotoMonth(row.value)}>{row.label}</td>)}
                        </tr>
                        <tr className="month-row">
                            {monArray.slice(9).map(row => <td key={row.value} className={row.value==viewableMonth?"selected":""} onClick={() => this.gotoMonth(row.value)}>{row.label}</td>)}
                        </tr>
                    </tbody></table>
                    </td></tr>
                </tbody>
            </table>
        )
    }

    renderCentury(centuryStart) {
        const {viewableYear, changeCentury} = this.props;
        const century = centuryStart - centuryStart%10;
        let centuryArray = [century-1, century, century + 1, century + 2, century + 3, century + 4, century + 5, century + 6, century + 7, century + 8, century + 9, century+10 ]
        return (
            <table className="century-table">
                <thead className="century-header header">
                    <tr className="century-header-row"><td>
                    <table><tbody>
                        <tr>
                            <td className="prev" onClick={() => changeCentury(century-10)}>{"<"}</td>
                            <td className="current-century">{century} - {century+10}</td>
                            <td className="next" onClick={() => changeCentury(century+10)}>{">"}</td>
                        </tr>
                    </tbody></table>
                    </td></tr>
                </thead>
                <tbody className="century-body body">
                    <tr><td><table>
                        <tbody>
                            <tr className="century-body-row">
                                <td className={centuryArray[0]==viewableYear?"selected out-scope":'out-scope'} onClick={()=>{this.gotoYear(centuryArray[11]);this.setState({showType:1})}}>{centuryArray[11]}</td>
                                {centuryArray.slice(1, 3).map(row => <td key={row} className={row==viewableYear?"selected":''} onClick={()=>{this.gotoYear(row);this.setState({showType:1})}}>{row}</td>)}
                            </tr>
                            <tr className="century-body-row">
                                {centuryArray.slice(3, 6).map(row => <td key={row} className={row==viewableYear?"selected":''} onClick={()=>{this.gotoYear(row);this.setState({showType:1})}}>{row}</td>)}
                            </tr>
                            <tr className="century-body-row">
                                {centuryArray.slice(6, 9).map(row => <td key={row} className={row==viewableYear?"selected":''} onClick={()=>{this.gotoYear(row);this.setState({showType:1})}}>{row}</td>)}
                            </tr>
                            <tr className="century-body-row">
                                {centuryArray.slice(9,11).map(row => <td key={row} className={row==viewableYear?"selected":''} onClick={()=>{this.gotoYear(row);this.setState({showType:1})}}>{row}</td>)}
                                <td className={centuryArray[11]==viewableYear?"selected out-scope":'out-scope'} onClick={()=>{this.gotoYear(centuryArray[11]);this.setState({showType:1})}}>{centuryArray[11]}</td>
                            </tr>
                        </tbody>
                    </table></td></tr>
                </tbody>
            </table>
        )
    }

    renderCalendar() {
        const {dayArray} = this.props;
        return (
            <table className="calendar-table">
                <thead className="header"> 
                    <tr className="month-row"><td>
                        <table>
                            <tbody>
                                <tr>
                                    <td onClick={this.gotoPreviousMonth} className="prev">{"<"}</td>
                                    <td className="current-month">
                                        <span className="month" onClick={() => this.setState({ showType: 1 })}>{this.getMonthName()}</span> 
                                        <span className="year" onClick={() => this.setState({ showType: 2 })}> {this.props.viewableYear}</span> 
                                    </td>
                                    <td onClick={this.gotoNextMonth} className="next" >{">"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td></tr>
                </thead>
                <tbody className="body"> 
                    <tr className="calendar-row"><td>
                        <table className="main-table">
                            <thead className="week-header">
                                <tr className="week-header-row">
                                    {dayArray.map((data,index)=><td key={index}>{data}</td>)}
                                </tr>
                            </thead>
                            <tbody className="days-body">
                                {this.renderCalendarArray()}
                            </tbody>
                        </table>
                    </td></tr>
                </tbody>      
            </table>
        )
    }

    render() {
        return (
            <div className="calendar">
                {this.state.showType == 0 && this.renderCalendar()}
                {this.state.showType == 1 && this.renderMonths()}
                {this.state.showType == 2 && this.renderCentury(this.props.viewableCentury)}
            </div>
        );
    }
}

export default Calendar;
