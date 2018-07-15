import React from 'react';
import axios from "axios";
import { BrowserRouter as Link } from 'react-router-dom';
import EditorCharacter from './editor-character.js'

class Editor extends React.Component {

	state = {
		BattleName: "",
		BattleNotes: "",
		monsters: {},
		monsterInputs: [ EditorCharacter ]
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	addCharacter = () => {
		const currentMonsterInputs = [...this.state.monsterInputs];
		currentMonsterInputs.push(EditorCharacter);
		this.setState({
			monsterInputs: currentMonsterInputs
		})
	}

	submit = (e) => {
		e.preventDefault();
		const body = {
			battleName: this.state.battleName,
			battleNotes: this.state.battleNotes,
			monsters: Object.values(this.state.monsters)
		}

	  	axios.post("/battlesPost", body).then(res => {
	    this.props.history.push('/');
	  });
	};

	cancel = (e) => {
		this.props.history.push('/');
	}

	handleCharacterChange = (index, formData) => {
		const newMonstersObject = Object.assign({}, this.state.monsters);
		newMonstersObject[index] = formData;
		this.setState({monsters: newMonstersObject});
	}

	render() {
		return (
			<div className="editor">
				<div className="edit-battle-header">
					<h2>Add Battle</h2>
				</div>
				<div className="battle-form">
					<form onSubmit={this.submit}>
						<div className="battle-form-main-info">
							<input type="text" class="" name="battleName" placeholder="Battle Name" onChange={this.onChange}></input>
						</div>
						{ this.state.monsterInputs.map(
							(EditorCharacter, i) => <EditorCharacter index={i} handleCharacterChange={this.handleCharacterChange} />
						)}
						<div className="battle-form-add-character">
							<button className="battle-form-add-character-button" type="button" onClick={this.addCharacter}>Add character</button>
						</div>
						<div className="battle-form-notes">
							<textarea name="battleNotes" cols="30" rows="10" placeholder="Battle notes" onChange={this.onChange}></textarea>
						</div>
						<div className="battle-form-submit-button">
							<input type="submit" class="" value="Save"></input>
						</div>
						<div className="battle-form-cancel">
							<button className="battle-skry-cancel-button-" type="button">
								<Link to='/'>Cancel and Return Home</Link>
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
};

export default Editor; 