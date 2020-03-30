import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native"; //é como se fosse o "useHistory" que usamos no front-end.
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1); //usado para controlar a paginação, sensação de "scroll infinito".
    const [loading, setLoading] = useState(false); //para armazenar os dados já vistos para que eles não seja carregados de novo, carregando uma página por vez.

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });//parâmetro "incident" será usado no "useRoute" da página "Detail"
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }

        if (total > 0 && incidents.length == total) {
            return;
        }else {
            setLoading(true);
        }

        const response = await api.get('incidents', {
            params: { page } //passar para a "api" em que página estamos.
        });
        
        setIncidents([...incidents, ...response.data]); //"..." significa copiar (ou anexar vetores), usado neste caso para poder anexar tudo o que vier de "incidents" e de "response.data" e não sobrepondo seus valores.
        setTotal(response.headers['X-Total-Count']);
        setPage(page + 1); //para pular para a próxima página
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo</Text>
            <Text style={styles.description}>
                Escolha um dos casos abaixo e salve o dia.
            </Text>

            <FlatList
                data={incidents} /* aqui virão todos os dados dos casos, quantos estiverem aqui, serão os criados em nossa lista. */
                style={styles.incidentList} 
                keyExtractor={incident => String(incident.id)} /* idenfica qual é a "chave" individual de cada Caso, que aqui será o "id". */
                showsVerticalScrollIndicator={false} /* retira a barra de "scroll" vertical. */
                onEndReached={loadIncidents} //usada para quando o usuário chegar no fim da lista.
                onEndReachedThreshold={0.2} //indica o percentual que será carregado da lista a partir de onde o usuário estiver.
                renderItem={({ item:incident }) => ( /* para trocar o nome de uma variável em uso, basta colocar "nome_variavel_antiga:nome_variavel_nova".*/
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', {
                                style: 'currency', 
                                currency: 'BRL'}).format(incident.value)}
                        </Text>

                        {/* "TouchableOpacity" é usado no lugar do "Button"
                        "onPresss" é o que irá acontecer ao clicar no botão */}
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="E02041" />
                        </TouchableOpacity>

                    </View>
                )} //no "renderItem", o segundo "parênteses" é colocado ao invés das "chaves", porque receberá um arquivo JSX
            />
               
        </View>
    );
}