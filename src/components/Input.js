import React from 'react'
import { Image, TextInput, View } from 'react-native'
import colors from '../theme/colors'
import { AntDesign } from '@expo/vector-icons';

export default function Input({
    width = "90%", height = 50, backgroundColor = colors.white, borderColor = colors.appTheme, borderRadius = 10, placeholder, value, onChangeText, source, marginTop, marginBottom, editable, marginVertical, onFocus, onBlur, iconColor,
    iconName, keyboardType
}) {
    return (
        <View style={{ width, height, backgroundColor, borderRadius, borderWidth: 1, borderColor, flexDirection: "row", alignItems: "center", paddingHorizontal: 20, marginTop, marginBottom, marginVertical }} >
            <TextInput {...{ keyboardType }} {...{ onFocus }} {...{ onBlur }} placeholderTextColor={colors.Grey2} {...{ editable }} autoCapitalize="none" {...{ value }} {...{ onChangeText }} {...{ placeholder }} style={{ flex: 1, height: "100%", margin: 0, padding: 0, color: "#000", fontSize: 16, paddingRight: 10 }} />
            {/* {source && <Image style={{ width: 20, height: 20, tintColor: colors.black }} {...{ source }} resizeMode="contain" />} */}
            {iconName && <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }} >
                <AntDesign name={iconName} size={20} color={iconColor} />
            </View>}
        </View>
    )
}
