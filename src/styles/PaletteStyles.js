export default {
    Palette : {
		height : "100vh",
		overflow: "hidden", /*might need to delete this late */
	},
	PaletteColors : {
		height : "90%",
		fontSize: "0"
	},
	PaletteFooter : {
		backgroundColor: "white",
		height : "5vh",
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		fontWeight: "bold",
	},
	Emoji : {
		fontSize: "1.5rem",
		margin: "0 1rem",
		paddingBottom: '.5rem',
	},
	GoBack : {
		width : "20%",
        height: props => props.paletteId ? "25%" : "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
		verticalAlign: "top",
		backgroundColor: "black",
	},
	copyButton: {
        width: "100px",
        height: "30px",
        position: "absolute",
        display: "inline-block",
        top: "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop: "-15px",
        textAlign: "center",
        outline: "none",
        background: "rgba(255, 255, 255, 0.3)",
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        opacity: 1
	},
	noDeco : {
		textDecoration : "none"
	}
}