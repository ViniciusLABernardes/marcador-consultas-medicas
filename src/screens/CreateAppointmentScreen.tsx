import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import theme from '../styles/themes';
import Header from '../components/Header';
import DoctorList from '../components/DoctorList';
import TimeSlotList from '../components/TimeSlotList';
import AsyncStorage from '@react-native-async-storage/async-storage';

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;
};

interface Appointment {
  id: string;
  patientId: string;
  patientName:string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  specialty: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}
interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

const availableDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rato',
    specialty: 'Cardiologista',
    image: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSpefQpRFzgJOBdMo7CRy2-Mig9-jMrrJAwO0WJwXbg6Ho0zSHrQNSOFyFXFoV1ShY1D6-2kXlobLkkLfuarmlN1g',
 },
 {
  id: '2',
  name: 'Dra. Rata',
  specialty: 'Dermatologista',
  image: 'https://static.sbt.com.br/noticias/images/139012.jpg',
},
{
  id: '3',
  name: 'Dr. FAUSTO',
  specialty: 'Oftalmologista',
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBarhs52ixfj2Nk-7DfDQ-7OjfJa96_8dMiw&s',
}
]
const CreateAppointmentScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<CreateAppointmentScreenProps['navigation']>();
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateAppointment = async () => {
    try {
      setLoading(true);
      setError('');

      if (!date || !selectedTime || !selectedDoctor) {
        setError('Por favor, preencha a data e selecione um médico e horário');
        return;
      }

      // Recupera consultas existentes
      const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
      const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

      // Cria nova consulta
      const newAppointment: Appointment = {
        id: Date.now().toString(),
        patientId: user?.id || '',
        patientName: user?.name || '',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date,
        time: selectedTime,
        specialty: selectedDoctor.specialty,
        status: 'pending',
      };

      // Adiciona nova consulta à lista
      appointments.push(newAppointment);

      // Salva lista atualizada
      await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));

      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    } catch (err) {
      setError('Erro ao agendar consulta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
return(
  <Container>
  <Header />
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <Title>Agendar Consulta</Title>

    <Input
      placeholder="Data (DD/MM/AAAA)"
      value={date}
      onChangeText={setDate}
      containerStyle={styles.input}
      keyboardType="numeric"
    />

    <SectionTitle>Selecione um Horário</SectionTitle>
    <TimeSlotList
      onSelectTime={setSelectedTime}
      selectedTime={selectedTime}
    />

    <SectionTitle>Selecione um Médico</SectionTitle>
    <DoctorList
      doctors={availableDoctors}
      onSelectDoctor={setSelectedDoctor}
      selectedDoctorId={selectedDoctor?.id}
    />

    {error ? <ErrorText>{error}</ErrorText> : null}

    <Button
      title="Agendar"
      onPress={handleCreateAppointment}
      loading={loading}
      containerStyle={styles.button as ViewStyle}
      buttonStyle={styles.buttonStyle}
    />

    <Button
      title="Cancelar"
      onPress={() => navigation.goBack()}
      containerStyle={styles.button as ViewStyle}
      buttonStyle={styles.cancelButton}
    />
  </ScrollView>
</Container>
);
};

const styles = {
scrollContent: {
padding: 20,
},
input: {
marginBottom: 15,
},
button: {
marginTop: 10,
width: '100%',
},
buttonStyle: {
backgroundColor: theme.colors.primary,
paddingVertical: 12,
},
cancelButton: {
backgroundColor: theme.colors.secondary,
paddingVertical: 12,
},
};

const Container = styled.View`
flex: 1;
background-color: ${theme.colors.background};
`;

const Title = styled.Text`
font-size: 24px;
font-weight: bold;
color: ${theme.colors.text};
margin-bottom: 20px;
text-align: center;
`;

const SectionTitle = styled.Text`
font-size: 18px;
font-weight: bold;
color: ${theme.colors.text};
margin-bottom: 10px;
margin-top: 10px;
`;

const ErrorText = styled.Text`
color: ${theme.colors.error};
text-align: center;
margin-bottom: 10px;
`;

export default CreateAppointmentScreen;