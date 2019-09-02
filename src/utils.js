export function formatDate(date){
    if(date){
        const day = date.getDate()>9 ? date.getDate() : "0" + date.getDate();
        let month = date.getMonth()+1;
        month = month>9 ? month : '0' + month;
        return day + "." + month + "." + date.getFullYear();
    }
    return "";
}

export function checkValidDate (input) {
    let dateArray = input.split(/['\-','\/','.']/);
    if(!(/^\d\d['\-','\/','.']\d\d['\-','\/','.']\d\d\d\d$/).test(input))
        return false;
    if(dateArray.length!=3)
        return false;
    let [date,month,year] = dateArray;
    if(date>31 || date<1)
        return false;
    if(month>12 || month<1)
        return false;
    month = month-1;
    if(year<1000 || year>9999)
        return false;
    let validDate = new Date(year,month,date);
    let validFlag =  validDate.getDate()==date && validDate.getMonth()==month && validDate.getFullYear()==year;
    if(validFlag)
        return validDate;
    return false;
}