import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

*{
	margin: 0;
	padding: 0;
	outline: 0;
	box-sizing: border-box;
}

body{
	font: 400 14px Robot, sans-serif;
	background-color: #f0f0f5;
	-webkit-font-smoothing: antialiased;
}

input, button, textarea {
	font: 400 18px Roboto, sans-serif;
}

button {
	cursor: pointer;
}

form input, form textarea {
	width: 100%;
	height: 60px;
	color: #333;
	border: 1px solid #dcdce6;
	border-radius: 8px;
	padding: 0 24px;
}

form textarea {
	min-height: 140px;
	padding: 16px 24px;
	line-height: 24px;
	resize: vertical;
}

`;
