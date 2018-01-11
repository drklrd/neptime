import Dateutil from 'ad-bs-converter';
import Moment from 'moment';
import { pulse } from 'react-animations';
import React from 'react';
import ReactDOM from 'react-dom';
import Radium, {StyleRoot} from 'radium';

import Nepalize from './lib';

const images = 3;
const imageIndex = Math.floor(Math.random() * images);
const styles = {
    pulse: {
        animation: 'x 1s',
        animationName: Radium.keyframes(pulse, 'pulse')
    }
};

class App extends React.Component{

    constructor(props){
        super(props);
        const currentDate = Moment();
        this.state = {
            formattedDate : currentDate.format('YYYY/MM/DD'),
            readableDate : currentDate.format('MMMM DD, YYYY '),
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
        const timeToReturn = {
            time : timePartial
        };
        if(time.split(':')[2]=='am'){
            timeToReturn['stage'] = 'बिहानको';
            timeToReturn['icon'] = 'wi wi-sunrise';
        }else{
            if(time.split(':')[0]>6){
                timeToReturn['stage'] = 'बेलुकाको';
                timeToReturn['icon'] = 'wi wi-moonrise';
            }else{
                timeToReturn['stage'] = 'दिउसको';
                timeToReturn['icon'] = 'wi wi-day-sunny';
            }
        }
        return timeToReturn;
    }

	render(){
	    const nepaliDateObj = Dateutil.ad2bs(this.state.formattedDate).ne;
	    const nepaliDate = `${nepaliDateObj.year} साल, ${nepaliDateObj.strMonth} ${nepaliDateObj.day} गते, ${nepaliDateObj.strDayOfWeek} `;
		return(
			<div>
                <img src={`img/nepal${imageIndex}.jpg`} alt="Background Image" className="background-image"/>
                <div className="contents">
                    <div className="row ">
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
                    <div className="row margin-date">
                        <div className="col-xs-offset-2 col-xs-8 text-center">
                            <span>
                                <StyleRoot>
                                    <div style={styles.pulse}>
                                        <span className="stage">
                                            <i className={this.renderTime(this.state.currentTime)['icon']}></i> &nbsp;
                                            { this.renderTime(this.state.currentTime)['stage']}
                                        </span>
                                        <br/>
                                        <span className="time">
                                            { this.renderTime(this.state.currentTime)['time']}
                                        </span>
                                    </div>
							    </StyleRoot>
                            </span>
                        </div>
                    </div>
                </div>
			</div>
		)
	}
}

ReactDOM.render(<App/>,document.getElementById("app"));