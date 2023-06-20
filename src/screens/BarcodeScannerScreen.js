import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';

export default function BarCodeScannerScreen() {
    const navigation = useNavigation()
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {

        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        await fetch(`https://world.openfoodfacts.org/api/v2/search?code=${data}&fields=code,product_name`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: null

        })
            .then((response) => response.json())
            //  .then((json) => setData(json.movies))
            .then(responseJson => {
                console.log('responseJson: ', responseJson);
                if (responseJson.error) {
                    alert(responseJson.error);
                }
                else {
                    
                    if (responseJson?.count > 0) {
                        navigation.navigate('AddItem', { data: responseJson.products[0] })

                    }
                    else{
                        alert('No data found')
                    }
                }

            }).catch((error) => {
                setScanned(true);
                console.log(error)
                alert('data not scanned')
            })


    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Header title={"Scan Barcode"} />
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}

            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
