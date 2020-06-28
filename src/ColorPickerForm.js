import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {Button} from '@material-ui/core'
class ColorPickerForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             currentColor: 'teal',
             newColorName: ""
        }
        this.updateColor = this.updateColor.bind(this);
        this.handleNewName = this.handleNewName.bind(this);
        this.handleNewColor = this.handleNewColor.bind(this);
    }
    componentDidMount() {
		ValidatorForm.addValidationRule("isColorNameUnique", (value) =>
			this.props.colors.every(
				({ name }) => name.toLowerCase() !== value.toLowerCase()
			)
		);
		ValidatorForm.addValidationRule("isColorUnique", (value) =>
			this.props.colors.every(
				({ color }) => color !== this.state.currentColor
			)
		);
	}
    updateColor(newColor) {
		this.setState({
			currentColor: newColor.hex,
		});
    }
    handleNewName(e) {
		this.setState({
			[e.target.name]: e.target.value,
		});
    }
    handleNewColor(){
        this.props.addNewColor({
            color : this.state.currentColor,
            name : this.state.newColorName
        })
        this.setState({
            newColorName: "",
        })
    }
	render() {
        const {isPaletteFull} = this.props;
        const {currentColor,newColorName} = this.state;
		return (
			<div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={this.updateColor}
				/>
				<ValidatorForm onSubmit={this.handleNewColor}>
					<TextValidator
						onChange={this.handleNewName}
						value={newColorName}
						name="newColorName"
						validators={[
							"required",
							"isColorNameUnique",
							"isColorUnique",
						]}
						errorMessages={[
							"this field is required",
							"Color Name already used",
							"Color already in the Palette",
						]}
					/>
					<Button
						variant="contained"
						color="primary"
						type="submit"
						disabled={isPaletteFull}
						style={{
							backgroundColor: isPaletteFull
								? "grey"
								: currentColor,
						}}
					>
						{isPaletteFull ? "Palette Full" : "Add Color"}
					</Button>
				</ValidatorForm>
			</div>
		);
	}
}

export default ColorPickerForm;
