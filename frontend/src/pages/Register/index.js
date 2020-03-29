import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import { Container, Content, Section } from './styles';

import logoImg from '../../assets/logo.svg';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [whatsapp, setWhatsapp] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const history = useHistory();

	async function handleRegister(event) {
		event.preventDefault();
		const request = { name, email, whatsapp, city, country };

		try {
			const { data } = await api.post('ongs', request);
			alert(`O seu ID de acesso: ${data.id}`);
			history.push('/');
		} catch (error) {
			alert('Erro ao registar.');
		}
	}

	return (
		<Container>
			<Content>
				<Section>
					<img src={logoImg} alt="App Logo" />
					<h1>Registo</h1>
					<p>
						Registe-se para entrar na plataforma e ajude pessoas a encontrar os
						casos da sua ONG.
					</p>
					<Link to="/">
						<FiArrowLeft size={16} color="#e02041" />
						Já tenho conta
					</Link>
				</Section>
				<form onSubmit={handleRegister}>
					<input
						onChange={({ target }) => setName(target.value)}
						value={name}
						type="text"
						placeholder="Nome da ONG"
					/>
					<input
						onChange={({ target }) => setEmail(target.value)}
						value={email}
						type="email"
						placeholder="E-mail"
					/>
					<input
						onChange={({ target }) => setWhatsapp(target.value)}
						value={whatsapp}
						type="text"
						placeholder="WhatsApp"
					/>
					<input
						onChange={({ target }) => setCity(target.value)}
						value={city}
						type="text"
						placeholder="Cidade"
					/>
					<input
						onChange={({ target }) => setCountry(target.value)}
						value={country}
						type="text"
						placeholder="País"
					/>
					<button type="submit">Registar</button>
				</form>
			</Content>
		</Container>
	);
}
