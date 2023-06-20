import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import colors from '../theme/colors';
import { AntDesign } from '@expo/vector-icons';




export default function DetailCard({ item, borderColor = colors.appTheme, onPress }) {

    const navigation = useNavigation()

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.qrCodeWrapper, { borderColor: item?.conditionStatus === 'Near to expire' ? 'yellow' : item?.conditionStatus === 'Expire' ? 'red' : 'green' }]}
        >

            <Image
                source={{ uri: item?.image }}
                style={{ width: 60, height: 60, margin: 10, transform: [{ rotate: "90deg" }] }}
            />


            <View style={{ flexDirection: 'column', paddingLeft: 10, justifyContent: 'space-between', paddingVertical: 10, }}>
                <Text style={{ ...styles.label, fontWeight: 'bold' }} numberOfLines={3}>Product Name: <Text style={{ ...styles.label, fontWeight: 'normal' }} >{item?.productName}</Text></Text>
                <Text style={{ ...styles.label, fontWeight: 'bold' }}>Product Type: <Text style={{ ...styles.label, fontWeight: 'normal' }}>{item?.productType}</Text></Text>
                <Text style={{ ...styles.label, fontWeight: 'bold' }}>Expiry Date: <Text style={{ ...styles.label, fontWeight: 'normal' }}>{item?.expiryDate}</Text></Text>

            </View>
            {/* <View style={{ width: 10, height: 10, marginTop: 5, marginBottom: 5, borderRadius: 5, alignSelf: 'flex-end', backgroundColor: item?.conditionStatus === 'Near to expire' ? 'yellow' : item?.conditionStatus === 'Expire' ? 'red' : 'green' }}>

            </View> */}


            {/* <AntDesign name='right' size={24} style={{ paddingHorizontal: 10 }} /> */}


        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,


    },
    buttonsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10, paddingHorizontal: 20,
    },

    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: '#000',
    },
    inputContainer: {
        marginVertical: 10,
        marginTop: 15, marginHorizontal: 20,
        justifyContent: "center",
        backgroundColor: colors.white,
        borderRadius: 15,
    },
    input: {
        padding: 20, paddingLeft: 50,
        borderRadius: 10,
        fontSize: 15,
        color: "#000"
    },
    search: {
        position: "absolute", left: 15, fontSize: 25, color: "#000"
    },
    qrCodeWrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: "center",
        marginVertical: 5,
        // borderWidth: 1,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderLeftWidth: 10,
        borderColor: colors.appTheme,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'relative',
        backgroundColor: '#fff',
        shadow: {
            shadowColor: "#FFF",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.50,
            shadowRadius: 3.84,

            elevation: 5,
        },
    },
    label: {
        fontSize: 16, color: "#000",
    }
});
