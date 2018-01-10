export default {
    nepalize : (stringNum)=>{
        const mapping = {
            '0': '०',
            '1': '१',
            '2': '२',
            '3': '३',
            '4': '४',
            '5': '५',
            '6': '६',
            '7': '७',
            '8': '८',
            '9': '९',
            '.' : '.',
            ',' : ',',
            ':' : ':'
        };
        let nepaliNumEquivalent = "";
        for (let i = 0; i < stringNum.length; i++) {
            nepaliNumEquivalent = nepaliNumEquivalent + mapping[stringNum[i]];
        }
        return (nepaliNumEquivalent);
    }
}