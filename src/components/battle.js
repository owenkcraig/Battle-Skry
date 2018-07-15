import React from 'react';

class Battle extends React.Component {
	render() {
		return (
			<div className="battle-skry-battle">
				<h3>SAMPLE BATTLE</h3>
				<div className="battle-skry-battle-characters">
					<div className="battle-skry-battle-characters">
						<div className="character-info">
							<p>CHARACTER NAME</p>
						</div>
						<div className="character-info">
							<p>CHARACTER RACE</p>
						</div>
						<div className="character-info">
							<p>CHARACTER HP</p>
						</div>
						<div className="character-info">
							<p>CHARACTER MAX HP</p>
						</div>
						<div className="character-info">
							<p>CHARACTER MAX HP</p>
						</div>
						<div className="battle-notes">
							<p>BATTLE NOTES</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Battle; 