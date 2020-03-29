import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Image, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { composeAsync as MailComposer } from 'expo-mail-composer';

import {
	Container,
	Header,
	HeaderNavigateBack,
	IncidentBox,
	IncidentProperty,
	IncidentValue,
	ContactBox,
	HeroTitle,
	HeroDescription,
	Actions,
	Action,
	ActionText
} from './styles';

import logoImg from '../../assets/logo.png';

export default function Detail() {
	const navigation = useNavigation();
	const { incident } = useRoute().params;

	const message = `Olá ${
		incident.name
	}, estou a entrar em contacto pois gostava de ajudar no caso "${
		incident.title
	}" com o valor de ${Intl.NumberFormat('pt-PT', {
		style: 'currency',
		currency: 'EUR'
	}).format(incident.value)}`;

	function navigateBack() {
		navigation.goBack();
	}

	function sendWhatsApp() {
		Linking.openURL(
			`whatsapp://send?phone=${incident.whatsapp}&text=${message}`
		);
	}

	function sendMail() {
		MailComposer({
			subject: `Herói do caso: ${incident.title}`,
			recipients: [incident.email],
			body: message
		});
	}

	return (
		<Container>
			<Header>
				<Image source={logoImg} />
				<HeaderNavigateBack onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#e02041" />
				</HeaderNavigateBack>
			</Header>

			<IncidentBox>
				<IncidentProperty style={{ marginTop: 0 }}>ONG:</IncidentProperty>
				<IncidentValue>
					{incident.name} de {incident.city}, {incident.country}
				</IncidentValue>

				<IncidentProperty>Caso:</IncidentProperty>
				<IncidentValue>{incident.title}</IncidentValue>

				<IncidentProperty>Preço:</IncidentProperty>
				<IncidentValue>
					{Intl.NumberFormat('pt-PT', {
						style: 'currency',
						currency: 'EUR'
					}).format(incident.value)}
				</IncidentValue>
			</IncidentBox>

			<ContactBox>
				<HeroTitle>Salve o dia!</HeroTitle>
				<HeroTitle>Seja o herói deste caso!</HeroTitle>
				<HeroDescription>Entre em contacto:</HeroDescription>
				<Actions>
					<Action onPress={sendWhatsApp}>
						<ActionText>WhatsApp</ActionText>
					</Action>
					<Action onPress={sendMail}>
						<ActionText>E-mail</ActionText>
					</Action>
				</Actions>
			</ContactBox>
		</Container>
	);
}
