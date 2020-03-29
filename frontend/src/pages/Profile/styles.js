import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	max-width: 1180px;
	padding: 0 30px;
	margin: 32px auto;

	header {
		display: flex;
		align-items: center;
		span {
			font-size: 20px;
			margin-left: 24px;
		}
		img {
			height: 64px;
		}
		a {
			width: 260px;
			height: 60px;
			margin-left: auto;
			margin-top: 0;
			background: #e02041;
			border: none;
			border-radius: 8px;
			color: #ffffff;
			font-weight: 700;
			display: inline-block;
			text-align: center;
			text-decoration: none;
			font-size: 18px;
			line-height: 60px;
			transition: filter 0.2s;
			&:hover {
				filter: brightness(90%);
			}
		}
		button {
			width: 60px;
			height: 60px;
			border-radius: 4px;
			border: 1px solid #dcdce6;
			background: transparent;
			margin-left: 16px;
			transition: filter 0.2s;
			&:hover {
				filter: brightness(90%);
			}
		}
	}

	h1 {
		margin: 80px 0 24px 0;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 24px;
		list-style: none;
		li {
			background-color: #fff;
			padding: 24px;
			border-radius: 8px;
			position: relative;

			button {
				position: absolute;
				right: 24px;
				top: 24px;
				border: 0;
				background: transparent;
				transition: filter 0.2s;
				&:hover {
					filter: brightness(50%);
				}
			}

			strong {
				display: block;
				margin-bottom: 16px;
				color: #41414d;
				text-transform: uppercase;
			}

			p + strong {
				margin-top: 32px;
			}

			p {
				color: #737380;
				line-height: 21px;
				font-size: 16px;
			}
		}
	}
`;
