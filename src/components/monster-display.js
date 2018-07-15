import React from 'react';

class MonsterDisplay extends React.Component {
	render() {
		const monsterData = this.props.monsters ? this.props.monsters : [];
		return (
			<div className="battle-skry-display-monster">
				<ul>
					{ monsterData.map(monster => {
						return(
							<li key={monster._id}>
								<h4>{ monster.monsterName }</h4>
								<p>{ monster.monsterHp }/{ monster.monsterMaxHp }</p>
							</li>
						)
					}) }
				</ul>
			</div>
		)
	}
};

export default MonsterDisplay; 
