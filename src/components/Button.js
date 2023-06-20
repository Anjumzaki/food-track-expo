import React from 'react'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import colors from '../theme/colors'
import LatoText from './LatoText'

export default function Button({
    width = "50%", height = 50, backgroundColor = colors.appTheme, borderRadius = 10, text, textColor = colors.white, marginTop, marginBottom, onPress, alignSelf, loading
}) {
    return (
        <TouchableOpacity {...{ onPress }}
            style={{ width, height, backgroundColor, borderRadius, justifyContent: "center", alignItems: "center", marginTop, marginBottom, alignSelf }}
        >
            {
                loading ?
                    <ActivityIndicator size={"small"} color={colors.white} />
                    :
                    <LatoText {...{ text }} color={textColor}  fontSize={16} />
            }
        </TouchableOpacity>
    )
}
