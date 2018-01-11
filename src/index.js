import Dateutil from 'ad-bs-converter';
import Moment from 'moment';
import { pulse } from 'react-animations';
import React from 'react';
import ReactDOM from 'react-dom';
import Radium, {StyleRoot} from 'radium';

import Nepalize from './lib';

const images = 3;
const recentPageToView = 10;
const imageIndex = Math.floor(Math.random() * images);
const styles = {
    pulse: {
        animation: 'x 1s',
        animationName: Radium.keyframes(pulse, 'pulse')
    }
};

let recentlyVisitedSites;

chrome.history.search({text: '', maxResults: recentPageToView}, (data)=> {
    recentlyVisitedSites = data.filter((page)=>page.title);
    ReactDOM.render(<App/>,document.getElementById("app"));
});

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
	    const nepaliDate = {
	        year : `${nepaliDateObj.year} साल, `,
            month : `${nepaliDateObj.strMonth} ${nepaliDateObj.day} गते, ` ,
            day : `${nepaliDateObj.strDayOfWeek} `
        };
	    const recentPages = recentlyVisitedSites.map((page,index)=>{
	        return(
                <div className="col-xs-2 page" key={index}>
                    <a href={page.url} target="_blank">
                        { page.title }
                    </a>

                </div>
            );
        });
		return(
			<div>
                <img src={`img/nepal${imageIndex}.jpg`} alt="Background Image" className="background-image"/>
                <div className="contents">
                    <div className="row ">
                        <div className="col-xs-offset-2 col-xs-8 text-center">
                            <span className="nepali-date">
                                { nepaliDate.year}
                                <span className="month-class">
                                    { nepaliDate.month}
                                </span>
                                { nepaliDate.day}
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
                    <div className="row margin-pages ">

                        <div className="col-xs-offset-1 col-xs-10">
                            <span className="recently">
                                हालसालै हेरिएका पृस्ठहरु
                            </span>
                            <br/>
                            { recentPages }
                        </div>
                    </div>
                </div>

			</div>
		)
	}
}