import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import LatoText from './LatoText'
import colors from '../theme/colors'
import { AntDesign } from '@expo/vector-icons';

export default function Header({ leftArrow, navigation, rightEdit, onEditPress, rightAddIcon, addEvent, title }) {

    return (
        <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between", height: 100, backgroundColor: colors.appTheme, paddingTop: 15 }} >
            <View style={{ zIndex: 1, paddingLeft: 20, flexDirection: "row", alignItems: "center", }} >
                {
                    leftArrow ?
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <AntDesign name="left" size={30} color="white" />
                        </TouchableOpacity>
                        :
                        <LatoText text={""} />

                }
            </View>
            <View style={{ position: "absolute", width: "100%", alignItems: "center", paddingTop: 15 }} >
                {
                    title &&
                    <LatoText text={title || "SIGN UP"} color={colors.white} fontSize={25} />
                }
            </View>
            <View style={{ paddingRight: 20 }} >

            </View>
        </View>
    )
}
