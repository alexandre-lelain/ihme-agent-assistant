class DateTools {
    
    static formatDate(date) {
        return DateTools.prettifyDateInteger(date.getDate()) + '/' +
                DateTools.prettifyDateInteger((date.getMonth() + 1)) + '/' +
                date.getFullYear() + ' à ' +
                DateTools.prettifyDateInteger(date.getHours()) + 'h' +
                DateTools.prettifyDateInteger(date.getMinutes()); 
    }

    static prettifyDateInteger(value){
        if (value<10){
            return `0${value.toString()}`;
        }
        return strValue = value.toString();
    }

    static createDateFromDialogFlow(dfDateString) {
        var dateString = dfDateString.replace(" ", "T") + "Z";
        var date = new Date(dateString);
        date.setHours(date.getHours() - 1);
        return date;
    }

    static getIntervalForNotification(date) {
        return date.getTime() - Date.now() - 1*(60 * 1000);
    }
}

export default DateTools;