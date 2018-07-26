import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import MonsterDisplay from './monster-display.js';

class BattleDisplay extends React.Component {

    state = {
        battles: [],
        loading: false
    }

    damageMonster = (battleIndex, monsterIndex) => {
        const stateCopy = Object.assign({}, this.state);
        const damagedMonster = stateCopy.battles[battleIndex].monsters[monsterIndex];
        if (damagedMonster.monsterHp > 0) {
            damagedMonster.monsterHp = damagedMonster.monsterHp - 1;
        } 
        this.setState(stateCopy);
    }

    healMonster = (battleIndex, monsterIndex) => {
        const stateCopy = Object.assign({}, this.state);
        const healedMonster = stateCopy.battles[battleIndex].monsters[monsterIndex];
        healedMonster.monsterHp = healedMonster.monsterHp + 1;
        this.setState(stateCopy);
    }

    saveHealth = (battleIndex, monsterIndex) => {
        const battleId = this.state.battles[battleIndex]._id;
        const body = {
            battleName: this.state.battles[battleIndex].battleName,
            battleNotes: this.state.battles[battleIndex].battleNotes,
            monsters: this.state.battles[battleIndex].monsters
        }
        axios.patch(`battlesPatch/battle/${battleId}`, body).then(res => {
            this.props.history.push('/');
        }).catch( err => console.log(err))
    }

    loadBattles = async (props) => {
        this.setState({ loading: true })
        const userId = props.user._id;
        if (userId) {
            const battleRes = await axios.get(`/battlesGet/user/${userId}`); 
            const battles =  battleRes.data.payload;
            this.setState({ battles, loading: false })
        }
    }

    componentDidMount = async () => {
        this.loadBattles(this.props);
    }

    componentWillReceiveProps = async (newProps) => {
        if (newProps !== this.props) {
            this.loadBattles(newProps);
        }
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
                        { battleData.map((battle, battleIndex) => {
                            return(
                                <div className="battleDataItem" key={battle._id}>
                                    <h3>{ battle.battleName }</h3>
                                    <p>{ battle.battleNotes }</p>
                                    <MonsterDisplay damageMonster={this.damageMonster} healMonster={this.healMonster} saveHealth={this.saveHealth} battleIndex={battleIndex} refresh={this.props.refresh} monsters={battle.monsters} />
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