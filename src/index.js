import React from 'react';
import ReactDOM from 'react-dom';
import Dateutil from 'ad-bs-converter';
import Moment from 'moment';

class App extends React.Component{

    constructor(props){
        super(props);
        const currentDate = Moment();
        this.state = {
            formattedDate : currentDate.format('YYYY/MM/DD'),
            readableDate : currentDate.format('YYYY, MMMM DD')
        }
    }

	render(){
	    const nepaliDateObj = Dateutil.ad2bs(this.state.formattedDate).ne;
	    const nepaliDate = `${nepaliDateObj.year} साल, ${nepaliDateObj.strMonth} ${nepaliDateObj.day} गते `;

	    console.log('>>',nepaliDateObj)
		return(
			<div>
                <img src="img/nepal.jpg" alt="Background Image" className="background-image"/>
                <div className="contents">
                    <div className="row">
                        <div className="col-xs-offset-2 col-xs-8 text-center">
                            { nepaliDate}
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
