
import React, { useState, useEffect } from 'react';
import GlobalStyles from "./Components/GlobalStyles.js";
import Router from "./Router.js";
import {ThemeProvider} from "styled-components";
import { lightTheme, darkTheme } from "./Components/Themes";


function App() {

	const [theme, setTheme] = useState('light');

	const themeToggler = () => {
	    theme === 'light' ? setTheme('dark') : setTheme('light')
	} 
	return (
	  	<ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
	    <>
	        <Router  themeToggler={themeToggler} currentTheme = {theme} />
	        <GlobalStyles />
	    </>
	    </ThemeProvider>
	);
}

export default App;
