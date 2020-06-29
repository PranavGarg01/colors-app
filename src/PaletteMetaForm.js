import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PaletteMetaForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
            open: false,
            newPaletteName : ""
        };
        this.handleNewName = this.handleNewName.bind(this);
    }
    componentDidMount() {
		ValidatorForm.addValidationRule("isPaletteNameUnique", (value) =>
			this.props.palettes.every(
				({ paletteName }) =>
					paletteName.toLowerCase() !== value.toLowerCase()
			)
		);
	}
	
	
    handleNewName(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}
	render() {
		const { newPaletteName } = this.state;

		return (
			<div>
				
               
				<Dialog
					open={this.props.open}
					onClose={this.props.handleClose}
					aria-labelledby="form-dialog-title"
				>
					<DialogTitle id="form-dialog-title">Enter Palette Name</DialogTitle>
                    <ValidatorForm
							onSubmit={() =>
								this.props.handleSave(this.state.newPaletteName)
							}
						>
					<DialogContent>
						<DialogContentText>
							Please type a unique name for your Palette.
						</DialogContentText>
						
							<TextValidator
								label="Palette Name"
								value={this.state.newPaletteName}
                                name="newPaletteName"
                                fullWidth
                                margin="normal"
								onChange={this.handleNewName}
								validators={["required", "isPaletteNameUnique"]}
								errorMessages={[
									"Enter Palette Name",
									"Name already used",
								]}
							/>
							
						
					</DialogContent>
					<DialogActions>
						<Button onClick={this.props.handleClose} color="primary">
							Cancel
						</Button>
						<Button
								variant="contained"
								color="primary"
								type="submit"
							>
								Save Palette
							</Button>
					</DialogActions>
                    </ValidatorForm>
				</Dialog>
                
			</div>
		);
	}
}

export default PaletteMetaForm;
