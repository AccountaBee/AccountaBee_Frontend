import { StyleSheet } from "react-native";

export default StyleSheet.create({
	headline_container: {
		paddingTop: 50,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: "#8688BC",

		marginBottom: 10
	},
	container: {
		display: "flex"
	},
	headline: {
		marginTop: 10,
		color: "white",
		fontSize: 26,
		textAlign: "center",
		marginBottom: 20
	},
	input_container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center"
	},
	request_container: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-end"
	},
	name: {
		fontSize: 20,
		marginRight: 5,
		fontWeight: "bold",
		padding: 10
	},
	email: {
		fontSize: 20,
		padding: 10
	},
	icon: {
		padding: 10
	},
	photo: {
		height: 30,
		width: 30,
		marginBottom: 7
	},
	header: {
		fontFamily: "Avenir",
		fontWeight: "500",
		fontSize: 28,
		color: "#845cab",
		textAlign: "center",
		marginTop: 60
	},
	button: {
		marginBottom: 10,
		color: "red"
	},

	input: {
		height: 48,
		borderRadius: 5,
		overflow: "hidden",
		backgroundColor: "white",
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 10,
		paddingLeft: 16,
		width: 300
	}
});
