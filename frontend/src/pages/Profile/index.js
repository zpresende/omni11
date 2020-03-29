import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import { Container } from './styles';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
	const [incidents, setIncidents] = useState([]);

	const ongName = localStorage.getItem('ongName');
	const ongId = localStorage.getItem('ongId');

	const history = useHistory();

	useEffect(() => {
		api
			.get('profile', {
				headers: {
					Authorization: ongId
				}
			})
			.then(({ data }) => {
				setIncidents(data);
			});
	}, [ongId]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId
				}
			});
			setIncidents(incidents.filter((incident) => incident.id !== id));
		} catch (error) {
			alert('Error ao eliminar o caso, tente novamente');
		}
	}

	function handleLogout() {
		localStorage.clear();
		history.push('/');
	}

	return (
		<Container>
			<header>
				<img src={logoImg} alt="App Logo" />
				<span>Bem-vinda, {ongName}</span>
				<Link to="/incidents/new">Registar novo caso</Link>
				<button onClick={handleLogout}>
					<FiPower size={18} color="#e02041" />
				</button>
			</header>
			<h1>Casos registados</h1>
			<ul>
				{incidents.map((incident) => (
					<li key={incident.id}>
						<strong>Caso:</strong>
						<p>{incident.title}</p>
						<strong>Descrição</strong>
						<p>{incident.description}</p>
						<strong>Valor:</strong>
						<p>
							{Intl.NumberFormat('pt-PT', {
								style: 'currency',
								currency: 'EUR'
							}).format(incident.value)}
						</p>
						<button onClick={() => handleDeleteIncident(incident.id)}>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</Container>
	);
}
