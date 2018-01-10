import Dateutil from 'ad-bs-converter';
import Moment from 'moment';
import { tada } from 'react-animations';
import React from 'react';
import ReactDOM from 'react-dom';
import Radium, {StyleRoot} from 'radium';

import Nepalize from './lib';

const images = 3;
const imageIndex = Math.floor(Math.random() * images);
const styles = {
    tada: {
        animation: 'x 1s',
        animationName: Radium.keyframes(tada, 'tada')
    }
};

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
        const timePartial  = Nepalize.nepalize(`${time.split(':')[0]}:${time.split(':')[1]}`);
        if(time.split(':')[2]=='am'){
            return `अहिले बिहानको ${timePartial} बजेको छ`;
        }else{
            if(time.split(':')[0]>6){
                return `अहिले बेलुकाको ${timePartial} बजेको छ`;
            }else{
                return `अहिले दिउसको ${timePartial} बजेको छ `;
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
                                <StyleRoot>
                                    <div style={styles.tada}>
                                        { this.renderTime(this.state.currentTime)}
                                    </div>
							    </StyleRoot>
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