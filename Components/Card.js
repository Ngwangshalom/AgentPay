import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import colors from '../Components/utils/colors';

const Card = props =>{
    return(
        <View style = {{...styles.card, ...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        position: 'relative',
        backgroundColor:'#282534',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 10,
        shadowOpacity: 0.2,
        borderRadius: 10,
        elevation: 5,
    }
})

export default Card;