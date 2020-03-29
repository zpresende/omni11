import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import { Container, Section } from './styles';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
	const [id, setId] = useState('');
	const history = useHistory();

	async function handleLogin(event) {
		event.preventDefault();
		try {
			const { data } = await api.post('sessions', { id });
			localStorage.setItem('ongId', id);
			localStorage.setItem('ongName', data.name);
			history.push('profile');
		} catch (error) {
			alert('Erro no login');
		}
	}

	return (
		<Container>
			<Section>
				<img src={logoImg} alt="App Logo" />
				<form onSubmit={handleLogin}>
					<h1>Iniciar sessão</h1>
					<input
						onChange={({ target }) => setId(target.value)}
						value={id}
						type="text"
						placeholder="ID"
					/>
					<button type="submit">Entrar</button>
					<Link to="/register">
						<FiLogIn size={16} color="#e02041" />
						Não tenho conta
					</Link>
				</form>
			</Section>
			<img src={heroesImg} alt="Heroes Lead" />
		</Container>
	);
}
