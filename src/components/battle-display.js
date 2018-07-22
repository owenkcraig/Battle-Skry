import React from 'react';
import axios from "axios";
import { BrowserRouter as Router, Link } from 'react-router-dom';
import MonsterDisplay from './monster-display.js';

class BattleDisplay extends React.Component {

    state = {
        battles: [],
        loading: false
    }

    loadBattles = async () => {
        this.setState({ loading: true })
        const battleRes = await axios.get('/battlesGet'); 
        const battles =  battleRes.data.payload;
        this.setState({ battles, loading: false })
    }

    componentDidMount = async () => {
        this.loadBattles();
    }

    render() {
        const battleData = this.state.battles ? this.state.battles : [];

		return (
			<div className="battle-skry-body">
            	<div className="battle-skry-display-buttons">
            	  <button className="battle-skry-add-battle-button" type="button">
            	    <Link to='/editor'>Add Battle</Link>
            	  </button>
            	</div>
				<div className="battle-skry-display-battle">
                    <div className="battleData">
                        { battleData.map(battle => {
                            return(
                                <div className="battleDataItem" key={battle._id}>
                                    <h3>{ battle.battleName }</h3>
                                    <p>{ battle.battleNotes }</p>
                                    <MonsterDisplay refresh={this.props.refresh} monsters={battle.monsters} />
                                    <button className="battle-edit-button" type="button">
                                        <Link to={`/editor/${battle._id}`}>Edit</Link>
                                    </button>
                                </div>
                            )
                        }) }
                    </div>
            	</div>
          	</div>
		);
	}
};

export default BattleDisplay; 