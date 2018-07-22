import React from 'react';
import axios from 'axios'

class MonsterDisplay extends React.Component {

	damage = (id, monsterHp) => {
		axios.patch(`/monsterHp/${id}`, {
			monsterHp: monsterHp - 1
		}).then(this.props.refresh)
		// update state for this monster HP to be -1
		// update monsterHp in the database for this.props.monsters[0]._id

	 //  	axios.patch(`/battlesPatch/${this.props.match.params._id}`, body).then(res => {
		// }).catch( err => console.log(err))
	}

	heal = (e) => {
		e.preventDefault();

	 //  	axios.patch(`/battlesPatch/${this.props.match.params._id}`, body).then(res => {
		// }).catch( err => console.log(err))
	}

	render() {
		const monsterData = this.props.monsters ? this.props.monsters : [];
		return (
			<div className="battle-skry-display-monster">
				<ul>
					{ monsterData.map(monster => {
						return(
							<li key={monster._id}>
								<h4>{ monster.monsterName }</h4>
								<p>{ monster.monsterRace }</p>
								<p>{ monster.monsterHp }/{ monster.monsterMaxHp }</p>
								<button onClick={() => this.damage(monster._id, monster.monsterHp)}>Damage</button>
								<button>Heal</button>
							</li>
						)
					}) }
				</ul>
			</div>
		)
	}
};

export default MonsterDisplay; 
