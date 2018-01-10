import React from 'react';
import ReactDOM from 'react-dom';
import Dateutil from 'ad-bs-converter';
import Moment from 'moment';

const images = 3;
const imageIndex = Math.floor(Math.random() * images);

function nepalize(stringNum) {
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

class App extends React.Component{

    constructor(props){
        super(props);
        const currentDate = Moment();
        this.state = {
            formattedDate : currentDate.format('YYYY/MM/DD'),
            readableDate : currentDate.format('YYYY, MMMM DD'),
            currentTime : currentDate.format('hh:mm:a')
        }
    }

    componentWillMount(){
        setInterval(this.updateTime.bind(this),1000 * 5);
    }

    updateTime(){
        const currentTime = Moment();
        this.setState({
            currentTime : currentTime.format('hh:mm:a')
        });
    }

    renderTime(time){
        const timePartial  = nepalize(`${time.split(':')[0]}:${time.split(':')[1]}`);
        if(time.split(':')[2]=='am'){
            return `${timePartial} बिहान`;
        }else{
            if(time.split(':')[0]>6){
                return `${timePartial} बेलुका`;
            }else{
                return `${timePartial} दिउस`;
            }
        }
    }

	render(){
	    const nepaliDateObj = Dateutil.ad2bs(this.state.formattedDate).ne;
	    const nepaliDate = `${nepaliDateObj.year} साल, ${nepaliDateObj.strMonth} ${nepaliDateObj.day} गते `;
		return(
			<div>
                <img src={`img/nepal${imageIndex}.jpg`} alt="Background Image" className="background-image"/>
                <div className="contents">
                    <div className="row">
                        <div className="col-xs-offset-2 col-xs-8 text-center">
                            <span className="time">
                                { this.renderTime(this.state.currentTime)}
                            </span>
                        </div>
                    </div>
                    <div className="row margin-date">
                        <div className="col-xs-offset-2 col-xs-8 text-center">
                            <span className="nepali-date">
                                { nepaliDate}
                            </span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-offset-2 col-xs-8 text-center">
                            <span className="english-date">
                                { this.state.readableDate }
                            </span>
                        </div>
                    </div>
                </div>
			</div>
		)
	}
}

ReactDOM.render(<App/>,document.getElementById("app"));
