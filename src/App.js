import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import SingleColorPalette from "./SingleColorPalette";
import PaletteList from './PaletteList';
import {generatePalette} from './colorHelpers';
import NewPaletteForm from './NewPaletteForm';
class App extends Component{
	constructor(props) {
		super(props)
	
		this.state = {
			palette : seedColors
		}
		this.savePalette = this.savePalette.bind(this)
	}
	
	findPalette(id) {
		return this.state.palette.find(function(palette) {
			return palette.id === id;
		})
	}
	savePalette(p) {
		this.setState({palette : [...this.state.palette,p]})
	}
	render() {
		return (
			<Switch>
				<Route exact path='/palette/new' render={(routeProps)=> <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palette}{...routeProps}/>} />
				<Route exact path='/' render={(routeProps)=> <PaletteList palette={this.state.palette} {...routeProps}/>} />
				<Route exact path='/palette/:id' 
					render={
						routeProps=>   (
						<Palette palette={
								generatePalette(this.findPalette(routeProps.match.params.id))
							}
						/>
						)
					} 
				/>
				<Route exact path='/palette/:paletteid/:colorid' render={(routeProps)=> <SingleColorPalette palette={generatePalette(this.findPalette(routeProps.match.params.paletteid))} colorId={routeProps.match.params.colorid}/>} />
			</Switch>


		);
	}
}

export default App;
