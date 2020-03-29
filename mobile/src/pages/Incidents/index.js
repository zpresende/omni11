import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import api from '../../services/api';

import {
	Container,
	Header,
	TextBold,
	Title,
	Description,
	HeaderText,
	IncidentList,
	IncidentItem,
	IncidentProperty,
	IncidentValue,
	IncidentButton,
	IncidentButtonText
} from './styles';

import logoImg from '../../assets/logo.png';

export default function Incidents() {
	const navigation = useNavigation();
	const [incidents, setIncidents] = useState([]);
	const [totalIncidents, setTotalIncidents] = useState(0);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	async function loadIncidents() {
		if (loading) return;
		if (totalIncidents > 0 && incidents.length === totalIncidents) return;
		setLoading(true);
		const { data, headers } = await api.get('incidents', { params: { page } });
		setIncidents([...incidents, ...data]);
		setTotalIncidents(headers['x-total-count']);
		setPage(page + 1);
		setLoading(false);
	}

	useEffect(() => {
		loadIncidents();
	}, []);

	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident });
	}

	return (
		<Container>
			<Header>
				<Image source={logoImg} />
				<HeaderText>
					Total de <TextBold>{totalIncidents} casos</TextBold>
				</HeaderText>
			</Header>
			<Title>Bem-vindo!</Title>
			<Description>Escolha um dos casos abaixo e salve o dia!</Description>

			<IncidentList
				data={incidents}
				keyExtractor={(incident) => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={loadIncidents}
				onEndReachedThreshold={0.2}
				renderItem={({ item: incident }) => (
					<IncidentItem>
						<IncidentProperty>ONG:</IncidentProperty>
						<IncidentValue>{incident.name}</IncidentValue>

						<IncidentProperty>Caso:</IncidentProperty>
						<IncidentValue>{incident.title}</IncidentValue>

						<IncidentProperty>Preço:</IncidentProperty>
						<IncidentValue>
							{Intl.NumberFormat('pt-PT', {
								style: 'currency',
								currency: 'EUR'
							}).format(incident.value)}
						</IncidentValue>

						<IncidentButton onPress={() => navigateToDetail(incident)}>
							<IncidentButtonText>Ver mais detalhes</IncidentButtonText>
							<Feather name="arrow-right" size={16} color="#e02041" />
						</IncidentButton>
					</IncidentItem>
				)}
			/>
		</Container>
	);
}
