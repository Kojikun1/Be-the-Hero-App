import React,{ useState, useEffect } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles'

export default function Incidents(){
    const [incidents,setInsidents] = useState([]);
    const [total,setTotal]  = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading]  = useState(false);


    const navigation  = useNavigation();

    function navigationToDetails(incident){
        console.log("working");
        navigation.navigate('Details', { incident } );
    }
    async function loadIncidents(){
        if (loading){
            console.log("fist");
            return;
        }
        if(total > 0 && incidents.length === total){
            console.log('second');
            return;
        }
        setLoading(true);

        const response = await api.get('incidents',{
            params: { page }
        });

        setInsidents([...incidents,...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }
    useEffect(()=> {
       loadIncidents();
    },[]);
    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Image source={logoImg} />
                <Text style={styles.headerText} >
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
           <FlatList
              style={styles.incidentList}
              data={incidents}
              //howsVerticalScrollIndicator={false}
              onEndReached={loadIncidents}
              onEndReachedThreshold={0.2}
              keyExtractor={incident => String(incident.id)}
              renderItem={({item: incident }) => (
                <View style={styles.incident} >
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',{
                            style: 'currency', 
                            currency: 'BRL'
                            }).format(incident.value)}
                    </Text>
                    <TouchableOpacity 
                        style={styles.detailsButton}
                        onPress={() => navigationToDetails(incident)}
                    >
                        <Text style={styles.detailsButtonText} >Ver mais detalhes</Text>
                        <Icon name="arrow-right" size={17} color="#E02041" />  
                    </TouchableOpacity>
                </View>
              )}
           />
        </View>
    )
}


