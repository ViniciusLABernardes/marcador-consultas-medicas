import React,{ useState } from "react";
import { ScrollView,FlatList,Alert} from "react-native";
import { Button } from "react-native-elements";
import styled from 'styled-components/native';
import { HeaderContainer,HeaderTitle } from "../components/Header";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import themes from "../styles/themes";

type RootStackParamList = {
  Home: undefined;
  CreateAppoinment: undefined;
  Profile: undefined;
};
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const[appointments,setAppointments]=React.useState([]);
  return(
    <Container>
      <HeaderContainer>
         <HeaderTitle>MinhasConsultas</HeaderTitle>
      </HeaderContainer>
      <Content>
        <Button
          title="Agendar nova consulta"
          icon={{
            name:'calendar-plus',
            type:'font-awesome',
            size:20,
            color:'white'
          }}
          buttonStyle={{
            backgroundColor:themes.colors.primary,
            borderRadius:8,
            padding:12
          }}
          onPress={()=>navigation.navigate('CreateAppointment')}
          />
        <AppointmentList
          data={appointments}
          keyExtractor={(item:any)=>item.id}
          renderItem={({item})=>(
            <AppointmentCard>
              <DoctorImage source={{uri:item.doctor.image}}/>
              <InfoContainer>
                <DoctorName>{item.doctor.name}</DoctorName>
                <Specialty>{item.doctor.specialty}</Specialty>
                <DateTime>{item.date} - {item.time}</DateTime>
              </InfoContainer>
            </AppointmentCard>
          )}
          />
      </Content>
    </Container>
  );
}
  
   const Container=styled.View`
      flex:1;
      background-color: ${themes.colors.background};
   `;
   const Content = styled.View`
    flex:1;
    padding: ${themes.spacing.medium}px;
   `;
   const AppointmentList = styled(FlatList)`
    margin-top:${themes.spacing.medium}px;
   `
  const AppointmentCard = styled.View`
    background-color:${themes.colors.background};
    border-radius: 8px;
    padding: ${themes.spacing.medium}px;
    margin-bottom: ${themes.spacing.medium}px;
    flex-direction: row;
    align-items:center;
  `;

  const DoctorImage =styled.Image`
  width:  60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${themes.spacing.medium}px;  
  `;


  const InfoContainer = styled.View`
    flex:1;
  `;

  const DoctorName  = styled.Text`
    font-size:${themes.typography.subtitle.fontSize}px;
    font-weight: ${themes.typography.subtitle.fontWeight}px;
    color:${themes.colors.text};
  `;

  const Specialty=styled.Text`
    font-size:${themes.typography.body.fontSize}px;
    color:${themes.colors.primary};
    margin-top:4px;
  `;

  const DateTime =styled.Text`
  font-size: ${themes.typography.body.fontSize}px;
  color:${themes.colors.primary};
  margin-top:4px;
  `

  const EmptyText =styled.Text`
    text-align: center;
    color : ${themes.colors.text};
    opacity: 0.6;
    margin-top: ${themes.spacing.large}px
  `;


export default HomeScreen;