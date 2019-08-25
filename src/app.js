import React, { Component } from 'react';
import Calendar from './SingleCalendar';
import RangeCalendar from './RangeCalendar';

class App extends Component{
   render(){
      const dayArray = ["Mo","Tu","We","Th","Fr","Sa","Su"];
      const monArray = [
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
        ];
      const sideMenu = [
            {
                label:"1 Month",
                from: new Date(new Date().setMonth( new Date().getMonth() - 1 )),
                to: new Date(),
            },
            {
                label:"3 Month",
                from: new Date(new Date().setMonth( new Date().getMonth() - 3 )),
                to: new Date(),
            },
            {
                label:"6 Month",
                from: new Date(new Date().setMonth( new Date().getMonth() - 6 )),
                to: new Date(),
            },
            {
                label:"1 Year",
                from: new Date(new Date().setFullYear( new Date().getFullYear() - 1 )),
                to: new Date(),
            },
            {
                label:"5 Years",
                from: new Date(new Date().setFullYear( new Date().getFullYear() - 5 )),
                to: new Date(),
            },
            {
                label:"10 Years",
                from: new Date(new Date().setFullYear( new Date().getFullYear() - 10 )),
                to: new Date(),
            },
        ]
      const disabled = (date) =>{
         if(date>new Date())
             return true;
      }

      return(
         <div>
            <h1>My React Calendar!!</h1>
            
            <Calendar 
               dayArray={dayArray}
               monArray={monArray}
               disabled={disabled}
               sideMenu={sideMenu}
               onChangeDate={(date)=>"adsd"}
               defaultDate={new Date()}
            />
            <br></br>

            <Calendar/>

            <br></br>

            <RangeCalendar
               dayArray={dayArray}
               monArray={monArray}
               disabled={disabled}
               sideMenu={sideMenu}
               onChangeFromDate={(date)=>"adsd"}
               onChangeToDate={(date)=>"adsd"}
               defaultFromDate={new Date()}
               defaultToDate={new Date()}
            />

            <br></br>
            
            <RangeCalendar/>


         </div>
      );
   }
}
export default App;