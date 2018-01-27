import {connect} from 'react-redux';
import Dateutil from 'ad-bs-converter';
import { getBookmarks } from './actions/actions';
import Moment from 'moment';
import * as ReactAnimations  from 'react-animations';
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import ReactSlick from 'react-slick';
import Todo from './todo';

import Nepalize from './lib';

const images = 3;
const recentPageToView = 10;
const imageIndex = Math.floor(Math.random() * images);

const styles = (style)=>{
    return {
        animation: 'x 1s',
        animationName: Radium.keyframes(ReactAnimations[style], style)
    }
};

const slickSettings = {
    dots: true,
    infinite: true,
    arrows : true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

class Neptime extends React.Component{

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
        this.props.getBookmarks(recentPageToView);
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
            if(time.split(':')[0]>6 && time.split(':')[0] !=12){
                timeToReturn['stage'] = 'बेलुकाको';
                timeToReturn['icon'] = 'wi wi-moonrise';
            }else{
                timeToReturn['stage'] = 'दिउँसको';
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
        return(
            <div>
                <img src={`img/nepal${imageIndex}.jpg`} alt="Background Image" className="background-image"/>
                <div className="contents">
                    <div  className="slider">
                        <ReactSlick  {...slickSettings} >
                            <div id="test" ref="test">
                                <div className="row ">
                                    <div   className="col-xs-offset-2 col-xs-8 text-center">
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
                                            <div style={styles('pulse')}>
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
                            <div>
                                <div className="row">
                                    <div className="col-xs-offset-2 col-xs-8 text-center">
                                        <Todo />
                                    </div>
                                </div>
                            </div>
                        </ReactSlick>
                    </div>
                    <div className="row margin-pages ">
                        <div className="col-xs-offset-1 col-xs-10">
                            <StyleRoot>
                                <div style={styles('bounceInUp')}>
                                       <span className="recently">
                                           हालसालै बुकमार्क गरिएका पृस्ठहरु
                                        </span>
                                    <br/>
                                    {
                                        this.props.bookmarks && this.props.bookmarks.length &&
                                        this.props.bookmarks.map((page,index)=>{
                                            return(
                                                <div className="col-xs-2 page" key={index}>
                                                    <a href={page.url} target="_blank">
                                                        { page.title }
                                                    </a>

                                                </div>
                                            );
                                        })

                                    }
                                </div>
                            </StyleRoot>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        bookmarks: state.bookmarks
    };
}

export default connect(
    mapStateToProps,
    { getBookmarks }
)(Neptime);