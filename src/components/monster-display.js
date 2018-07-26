import React from 'react';

class MonsterDisplay extends React.Component {

	render() {
		const monsterData = this.props.monsters ? this.props.monsters : [];
		return (
			<div className="battle-skry-display-monster">
				<ul>
					{ monsterData.map((monster, monsterIndex) => {
						return(
							<li key={monster._id}>
								<h4>{ monster.monsterName }</h4>
								<p>{ monster.monsterRace }</p>
								<p>{ monster.monsterHp }/{ monster.monsterMaxHp }</p>
								<button onClick={ () => this.props.damageMonster(this.props.battleIndex,monsterIndex)}>Damage</button>
								<button onClick={ () => this.props.healMonster(this.props.battleIndex,monsterIndex)}>Heal</button>
								<button onClick={ () => this.props.saveHealth(this.props.battleIndex,monsterIndex)}>Save health</button>
							</li>
						)
					}) }
				</ul>
			</div>
		)
	}
};

export default MonsterDisplay; 
