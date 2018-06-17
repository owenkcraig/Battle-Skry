import React from 'react';

class EditorCharacter extends React.Component {
	render() {
		return (
			<div className="edit-character">
				<input type="text" class="" name="characterName" placeholder="Character Name"></input>
				<input type="text" class="" name="characterRace" placeholder="Character Race"></input>
				<input type="number" class="" name="characterHP" placeholder="Character HP"></input>
				<input type="number" class="" name="characterMaxHP" placeholder="Character Max HP"></input>
			</div>
		);
	}
};

export default EditorCharacter; 