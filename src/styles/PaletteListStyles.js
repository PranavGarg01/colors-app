import bg from './bg.svg'
export default {
    root : {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#aa3333",
        backgroundImage: `url(${bg})`
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
      },
      nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white",
        alignItems: "center",
        "& a": {
          backgroundColor: "#d35400",
          color: "white",
          padding: ".5em",
          textDecoration: "none",
          textTransform: "uppercase"
        }
      },
      palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
      }
}