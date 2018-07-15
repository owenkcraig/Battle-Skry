import React from 'react';

class EditorCharacter extends React.Component {
	state = {
		monsterName: '',
		monsterRace: '',
		monsterHp: 0,
		monsterMaxHp: 0
	}
	onChange = (e) => {
		const { handleCharacterChange, index } = this.props;
		this.setState({
			[e.target.name]: e.target.value,
		}, () => handleCharacterChange(index,this.state));
	}
	render() {
		return (
			<div className="edit-character">
				<input onChange={this.onChange} type="text" class="" name="monsterName" placeholder="Character Name"></input>
				<input onChange={this.onChange} type="text" class="" name="monsterRace" placeholder="Character Race"></input>
				<input onChange={this.onChange} type="number" class="" name="monsterHp" placeholder="Character HP"></input>
				<input onChange={this.onChange} type="number" class="" name="monsterMaxHp" placeholder="Character Max HP"></input>
			</div>
		);
	}
};

export default EditorCharacter; 