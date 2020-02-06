function dayPart() {
    const getPart = (h) => {
        switch (h) {
            case 6: case 7: case 8: case 9: case 10:                       return 'morning'; 
            case 11: case 12: case 13: case 14: case 15: case 16: case 17: return 'midday';
            case 18: case 19: case 20: case 22:                            return 'afternoon';
            default:                                                       return 'midnight'; 
        } 
    };

    const switchDayPart = () => {
        node.classList.forEach(className => { if (className.indexOf('day-part_part_') != -1) node.classList.remove(className) } );
        node.classList.add(`day-part_part_${data.part}`);
    };

    const disableEnum = (val) => {
        return {
            value: val,
            writable: true,
            enumerable: false,
            configurable: false
        }
    };

    let prop, 
        hours = new Date().getHours(), 
        part = getPart(hours),
        node = document.querySelector('.app-wrap');

    const data = {
        // _hours: hours,
        get hours() { return this._hours },
        set hours(value) {
            this._hours = value;
            this.part = getPart(value);
            switchDayPart();
        },

        // _part: part,
        get part() { return this._part },
        set part(value) {
            this._part = value;
            switchDayPart();
        }
    };

    Object.defineProperties(data, {
        _hours: disableEnum(hours),
        _part: disableEnum(part)
    });

    nodeData.add(node, 'dayPart', data);
    prop = nodeData.get(node);

    switchDayPart();
    setInterval(switchDayPart, 60000);
}

dayPart();