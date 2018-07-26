import React from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import EditorCharacter from './editor-character.js'

class Editor extends React.Component {

	state = {
		battleName: "",
		battleNotes: "",
		monsters: [],
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	}

	addCharacter = () => {
		const currentMonsters = [...this.state.monsters];
		currentMonsters.push({
		monsterName: '',
		monsterRace: '',
		monsterHp: 0,
		monsterMaxHp: 0
	});
		this.setState({
			monsters: currentMonsters
		})
	}

	submit = (e) => {
		e.preventDefault();

		if (!this.state.battleName || this.state.battleName === "") {
			console.log("No battle name.")
			return;
		}

		this.state.monsters.forEach(function (i) {
		    if (!i.monsterName || i.monsterName === "") {
		    	console.log("No monster name");
		    	return;
		    }
		    if (!i.monsterRace || i.monsterRace === "") {
		    	console.log("No monster race");
		    	return;
		    }
		});

		if (!this.props.match || !this.props.match.params._id) {
			// If we are making a NEW one
			const body = {
				battleName: this.state.battleName,
				battleNotes: this.state.battleNotes,
				monsters: Object.values(this.state.monsters),
				userId: this.props.user._id
			}

		  	axios.post("/battlesPost", body).then(res => {
		    	this.props.history.push('/');
			}).catch( err => console.log(err))
		} else {
			// If we are UPDATING
			const body = {
				battleName: this.state.battleName,
				battleNotes: this.state.battleNotes,
				monsters: Object.values(this.state.monsters)
			}

		  	axios.patch(`/battlesPatch/battle/${this.props.match.params._id}`, body).then(res => {
		    	this.props.history.push('/');
			}).catch( err => console.log(err))
	  };
	}

	delete = (e) => {
		e.preventDefault();
		axios.delete(`/battlesPatch/battle/${this.props.match.params._id}`).then(res => {
	    	this.props.history.push('/');
		}).catch( err => console.log(err)) 
	}

	cancel = (e) => {
		this.props.history.push('/');
	}

	handleCharacterChange = (e, index) => {
		const newMonsters = [...this.state.monsters];
		newMonsters[index][e.target.name] = e.target.value;
		this.setState({monsters: newMonsters});
	}

	componentDidMount = async () => {
    	if (!this.props.match || !this.props.match.params._id) return;
    	const thisBattleId = this.props.match.params._id;
    	const result = await axios.get(`/battlesGet/battle/${thisBattleId}`);
    	const payload = result.data.payload;
    	this.setState({
    		battleName: payload.battleName,
    		battleNotes: payload.battleNotes,
    		monsters: payload.monsters,
    	});
  	}

	render() {
		return (
			<div className="editor">
				<div className="edit-battle-header">
					<h3>Add A Battle</h3>
				</div>
				<div className="battle-form">
					<form onSubmit={this.submit}>
						<div className="battle-form-main-info">
							<input type="text" className="editor-battleName" name="battleName" placeholder="Battle Name" onChange={this.onChange} value={this.state.battleName}></input>
						</div>
						{ this.state.monsters.map(
							(monsterData, i) => <EditorCharacter index={i} handleCharacterChange={this.handleCharacterChange} monsterData={monsterData} />
						)}
						<div className="battle-form-add-character">
							<button className="battle-form-add-character-button" type="button" onClick={this.addCharacter}>Add character</button>
						</div>
						<div className="battle-form-notes">
							<textarea className="editor-battleNotes" name="battleNotes" cols="30" rows="10" placeholder="Battle notes" onChange={this.onChange} value={this.state.battleNotes}></textarea>
						</div>
						<div className="battle-form-submit-button">
							<input type="submit" className="" value="Save"></input>
						</div>
						{this.props.match ? <div className="battle-form-delete-button">
							<button className="battle-skry-delete-button-" onClick={this.delete} type="button">
								Delete
							</button>
						</div> : null}
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