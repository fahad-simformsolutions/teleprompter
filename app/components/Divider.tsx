import * as React from 'react';
import {View, StyleSheet} from 'react-native';

export function Divider() {
    return <View style={styles.container} />
}

const styles = StyleSheet.create({
    container: {
        height: 1,
        width: 'auto',
        alignSelf: 'stretch',
        marginHorizontal: 10,
        backgroundColor: '#e3e3e3'
    }
})