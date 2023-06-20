import React, { useState } from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../theme/colors'
import LatoText from './LatoText'
import { AntDesign } from '@expo/vector-icons';

export default function CustomTab({ state, descriptors, navigation }) {

    const changeActive = (screen) => {
        navigation.navigate(screen)
    }

    return (
        <View style={{ backgroundColor: colors.white, justifyContent: "center", height: 80, alignItems: "center" }}>




            <TouchableOpacity onPress={() => changeActive("BarCodeScannerScreen")} activeOpacity={0.7} style={[styles.shadow, { width: 70, height: 70, borderRadius: 35, backgroundColor: "#6974FB", marginBottom: 60, justifyContent: "center", alignItems: "center" }]} >
                <AntDesign name="scan1" size={30} color="white" />
                {/* <LatoText fontSize={15} text={"Scan"} textAlign={'center'} color={colors.white} /> */}
            </TouchableOpacity>


            {/* <Icon image={BOTTOM_USER_ICON} onPress={() => changeActive(4, "ProfileStack")} activeTab={activeTab === 4 ? colors.orange : colors.greyText} /> */}


        </View >
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
