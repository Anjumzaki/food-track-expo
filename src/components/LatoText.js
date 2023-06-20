import React from "react";
import { Text, } from "react-native";

export default ({
    lines, fontName, fontSize, color, alignSelf, backgroundColor, flex, width, height,
    marginVertical, marginHorizontal, marginTop, marginLeft, marginRight, marginBottom,
    padding, paddingTop, paddingLeft, paddingBottom, paddingRight, paddingHorizontal, paddingVertical,
    opacity, textAlign, textAlignVertical, text, fontWeight, onPress, lineHeight, textDecorationLine,
    style
}) => {
    // bold: 'Nunito-Bold',
    // regular: 'Nunito-Regular',
    // semibold: 'Nunito-SemiBold',

    // 16 = wp(4)
    // 14 = wp(3.4)
    // 18 = wp(4.4)
    // 24 = wp(5.8)

    return (
        <Text numberOfLines={lines}
            onPress={onPress}

            style={[{
                fontFamily: fontName,
                fontSize: fontSize || 16,
                color: color || "#000",
                alignSelf,
                fontWeight,
                backgroundColor,
                flex,
                width, height,
                marginVertical, marginHorizontal,
                marginTop, marginLeft, marginRight, marginBottom,
                padding, paddingTop, paddingLeft, paddingBottom,
                paddingRight,
                paddingHorizontal, paddingVertical,
                opacity,
                textAlign, textAlignVertical,
               textDecorationLine,
                lineHeight
            }, style]}
        >
            {text}
        </Text >
    );
}