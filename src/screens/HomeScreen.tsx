import React,{ useState } from "react";
import { ScrollView,FlatList,Alert } from "react-native";
import styled from 'styled-components/native';
import { HeaderContainer,HeaderTitle } from "../components/Header";

const HomeScreen = () => {
    const [text,setText] = useState('');
    const [items, setItems] = useState([
        {id: '1', text: 'Item 1'},
        {id: '2', text: 'Item 2'},
        {id: '3', text: 'Item 3'},
    ]);

    const addItem = () => {
        if (text.trim()){
            setItems([...items,{id:Date.now().toString(),text}]);
            setText('');
        }
    }


}