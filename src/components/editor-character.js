import React from 'react';

class EditorCharacter extends React.Component {
	render() {
		return (
			<div className="edit-character">
				<input onChange={(e) => this.props.handleCharacterChange(e, this.props.index)} type="text" className="editor-characterInfoInput" name="monsterName" value={this.props.monsterData.monsterName} placeholder="Character Name"></input>
				<input onChange={(e) => this.props.handleCharacterChange(e, this.props.index)} type="text" className="editor-characterInfoInput" name="monsterRace" value={this.props.monsterData.monsterRace} placeholder="Character Race"></input>
				<input onChange={(e) => this.props.handleCharacterChange(e, this.props.index)} type="number" className="editor-characterInfoInput" name="monsterHp" value={this.props.monsterData.monsterHp} placeholder="Character HP"></input>
				<input onChange={(e) => this.props.handleCharacterChange(e, this.props.index)} type="number" className="editor-characterInfoInput" name="monsterMaxHp" value={this.props.monsterData.monsterMaxHp} placeholder="Character Max HP"></input>
			</div>
		);
	}
};

export default EditorCharacter; 