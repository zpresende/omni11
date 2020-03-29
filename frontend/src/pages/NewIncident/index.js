import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import { Container, Content, Section } from './styles';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
	const ongId = localStorage.getItem('ongId');

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [value, setValue] = useState('');

	const history = useHistory();

	async function handleNewIncident(event) {
		event.preventDefault();
		const request = { title, description, value };
		try {
			await api.post('incidents', request, {
				headers: { Authorization: ongId }
			});
			history.push('/profile');
		} catch (error) {
			alert('Erro ao registar o caso, tente novamente');
		}
	}

	return (
		<Container>
			<Content>
				<Section>
					<img src={logoImg} alt="App Logo" />
					<h1>Registar novo caso</h1>
					<p>
						Descreva detalhadamente o caso para encontrar um herói para ajudar!
					</p>
					<Link to="/profile">
						<FiArrowLeft size={16} color="#e02041" />
						Voltar para home
					</Link>
				</Section>
				<form onSubmit={handleNewIncident}>
					<input
						onChange={({ target }) => setTitle(target.value)}
						value={title}
						type="text"
						placeholder="Título do caso"
					/>
					<textarea
						onChange={({ target }) => setDescription(target.value)}
						value={description}
						placeholder="Descrição"
					></textarea>
					<input
						onChange={({ target }) => setValue(target.value)}
						value={value}
						type="text"
						placeholder="Preço"
					/>
					<button type="submit">Registar</button>
				</form>
			</Content>
		</Container>
	);
}
