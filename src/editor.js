import React from 'react';
import EditorCharacter from './editor-character.js'

class Editor extends React.Component {
	render() {
		return (
			<div className="editor">
				<div className="edit-battle-header">
					<h2>Add Battle</h2>
				</div>
				<div className="battle-form">
					<form action="">
						<div className="battle-form-main-info">
							<input type="text" class="" name="battleName" placeholder="Battle Name"></input>
						</div>
						<EditorCharacter />
						<div className="battle-form-add-character">
							<button className="battle-form-add-character-button" type="button">Add character</button>
						</div>
						<div className="battle-form-notes">
							<textarea name="battleNotes" cols="30" rows="10" placeholder="Battle notes"></textarea>
						</div>
						<div className="battle-form-submit-button">
							<input type="submit" class="" value="Save"></input>
						</div>
					</form>
				</div>
			</div>
		);
	}
};

export default Editor; 