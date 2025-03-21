import React from 'react';
import styled from 'styled-components/native';
import { Button, Input } from 'react-native-elements';
import { HeaderContainer, HeaderTitle } from '../components/Header';
import themes from '../styles/themes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  CreateAppointment: undefined;
  Profile: undefined;
};

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;
};

const CreateAppointmentScreen: React.FC<CreateAppointmentScreenProps> = ({ navigation }) => {
  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Agendar Consulta</HeaderTitle>
      </HeaderContainer>

      <Content>
        <Button
          title="Voltar"
          icon={{
            name: 'arrow-left',
            type: 'font-awesome',
            size: 20,
            color: 'white'
          }}
          buttonStyle={{
            backgroundColor: themes.colors.primary,
            borderRadius: 8,
            padding: 12,
            marginBottom: 20
          }}
          onPress={() => navigation.goBack()}
        />

     
        <FormText>Formulário de Agendamento</FormText>
        <Container>
            <CampoInput>
            <Input placeholder='digite o nome da consulta que deseja agendar'/>
            </CampoInput>
    
           
        </Container>
      </Content>
    </Container>
  );
};

const CampoInput = styled.View`
    background-color:${themes.colors.background2};
`;
const Container = styled.View`
  flex: 1;
  background-color: ${themes.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${themes.spacing.medium}px;
`;

const FormText = styled.Text`
  font-size: ${themes.typography.subtitle.fontSize}px;
  color: ${themes.colors.text};
  text-align: center;
`;

export default CreateAppointmentScreen;