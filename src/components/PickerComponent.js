import React from 'react'
import { ActivityIndicator, Modal, View } from 'react-native'
import colors from '../theme/colors'
import { Picker } from '@react-native-picker/picker';

export default function PickerComponent({ visible, selectedValue, onValueChange }) {
    return (
        <Modal {...{ visible }} transparent={true} animationType="slide"  >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.7)" }} >
                <View style={{ width: '100%', borderRadius: 10, height: 50, alignItems: 'center', borderWidth: 1, borderColor: '#aaa', paddingLeft: 10 }}>
                    <Picker
                        style={{ width: '100%', }}
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) =>
                            onValueChange(itemValue !== 'Select Status' ? itemValue : null)
                        }>
                        <Picker.Item label="Select Status" value="Select Status" />
                        <Picker.Item label="Fresh" value="Fresh" />
                        <Picker.Item label="Frozen" value="Frozen" />
                        <Picker.Item label="Ripe" value="Ripe" />
                    </Picker>

                </View>
            </View>
        </Modal>
    )
}