import React, { Component } from 'react'
import { TextInput, View, Image, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import AppLoader from '../components/AppLoader'
import Header from '../components/Header'
import LatoText from '../components/LatoText'
import middleware from '../store/middleware'
import colors from '../theme/colors'
import moment from 'moment'
import Button from '../components/Button'
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { heightPercentageToDP } from 'react-native-responsive-screen'
class AddItem extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            search: "",
            itemType: "",
            quantity: "",
            purchased: "",
            expiresOn: new Date,
            itemName: "",
            image: null,
            showStartDatePicker: false,
            mode: 'date',
            show: false,
            selectedValue: null,

        }
    }



    async componentDidMount() {
        this.setState({ loading: true, itemName: this.props.route.params.data?.product_name })

        this.setState({ loading: false })
    }

    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            this.setState({ image: result.assets[0].uri });
        }
    };

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        this.setState({ show: false });
        this.setState({ expiresOn: currentDate });
    };

    showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            this.setState({ show: true });
            // for iOS, add a button that closes the picker
        }
        this.setState({ mode: currentMode });
    };

    showDatepicker = () => {
        this.showMode('date');
    };

    showTimepicker = () => {
        this.showMode('time');
    };

    addItem = async () => {
        this.setState({loading:true})
        if (!this.state.image) {
            this.setState({loading:false})
            return alert('Please select image')
        }
        else if (!this.state.itemName) {
            this.setState({loading:false})
            return alert('Please enter product name')
        }
        else if (!this.state.itemType) {
            this.setState({loading:false})
            return alert('Please enter product type')
        }
        else if (!this.state.quantity) {
            this.setState({loading:false})
            return alert('Please enter product quantity')
        }
        else if (!this.state.expiresOn) {
            this.setState({loading:false})
            return alert('Please select expiry date')
        }
        else if (this.state.selectedValue === 'Select Status' || !this.state.selectedValue) {
            this.setState({loading:false})
            return alert('Please select Status')
        }
        let body = [...this.props.products, {
            image: this.state.image,
            productType: this.state.itemType,
            quantity: this.state.quantity,
            productName: this.state.itemName,
            expiryDate: moment(this.state.expiresOn).format('YYYY-MM-DD'),
            status: this.state.selectedValue,
            createdAt: new Date()
        }]
        await this.props._addProduct(body)
        this.setState({loading:false})
        alert('Added Successfully!')
        this.props.navigation.navigate('TabStack')

    }

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} >
                <Header navigation={this.props.navigation} leftArrow title={"Add Product"} />
                <ScrollView contentContainerStyle={{ width: "100%", minHeight: heightPercentageToDP(100), }} >

                    <View style={{ flex: 1, width: '100%' }} >
                        <View style={{ flex: 1, paddingHorizontal: 20, width: '100%', justifyContent: 'space-between', alignItems: 'center' }} >
                            <View style={{ flex: 1, width: '100%', }} >
                                <View style={{ width: '100%', marginVertical: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ width: '25%', borderRadius: 10, alignItems: 'center', height: 90, backgroundColor: colors.white, justifyContent: 'center' }}>
                                        {
                                            !this.state.image ?
                                                <AntDesign onPress={() => this.pickImage()} name="camera" size={30} color={colors.appTheme} />
                                                :
                                                <Image style={{ width: '80%', height: '100%', overflow: 'hidden' }} source={{ uri: this.state.image }} resizeMode="contain" />

                                        }
                                    </View>
                                    <TextInput cursorColor={colors.appTheme} numberOfLines={4} multiline={true} value={this.state.itemName} placeholderTextColor={'#aaa'} onChangeText={itemName => this.setState({ itemName })} placeholder="Item Name" style={{ margin: 0, padding: 0, paddingHorizontal: 10, fontSize: 18, paddingVertical: 10, width: '70%', height: 90, color: colors.black, fontWeight: 'bold' }} ></TextInput>
                                </View>
                                <View style={{ width: '100%', marginTop: 20, borderRadius: 10, borderWidth: 1, height: 50, paddingHorizontal: 20, borderColor: '#aaa', alignItems: 'center', flexDirection: 'row' }}>
                                    <LatoText width={'30%'} text={'Item type'} marginLeft={5} fontWeight={'500'} fontSize={16} color={colors.Grey2} />
                                    <TextInput cursorColor={colors.appTheme} value={this.state.itemType} placeholderTextColor={'#aaa'} onChangeText={itemType => this.setState({ itemType })} placeholder="Item type" style={{ margin: 0, padding: 0, width: '70%', color: colors.appTheme, fontWeight: '400' }} ></TextInput>
                                </View>
                                <View style={{ width: '100%', marginTop: 20, borderRadius: 10, borderWidth: 1, height: 50, paddingHorizontal: 20, borderColor: '#aaa', alignItems: 'center', flexDirection: 'row' }}>
                                    <LatoText width={'30%'} text={'Quantity'} marginLeft={5} fontWeight={'500'} fontSize={16} color={colors.Grey2} />
                                    <TextInput cursorColor={colors.appTheme} value={this.state.quantity} placeholderTextColor={'#aaa'} onChangeText={quantity => this.setState({ quantity })} placeholder="Quantity" style={{ margin: 0, padding: 0, width: '70%', color: colors.appTheme, fontWeight: '400' }} ></TextInput>
                                </View>
                                {/* <View style={{ width: '100%', marginTop: 20, borderRadius: 10, borderWidth: 1, height: 50, paddingHorizontal: 20, borderColor: '#aaa', alignItems: 'center', flexDirection: 'row' }}>
                                    <LatoText width={'30%'} text={'Purchased'} marginLeft={5} fontWeight={'500'} fontSize={16} color={colors.Grey2} />
                                    <TextInput cursorColor={colors.appTheme} value={this.state.purchased} placeholderTextColor={'#aaa'} onChangeText={purchased => this.setState({ purchased })} placeholder="Purchased" style={{ margin: 0, padding: 0, width: '70%', color: colors.appTheme, fontWeight: '400' }} ></TextInput>
                                </View> */}
                                <TouchableOpacity onPress={() => { this.setState({ show: true, }), this.showDatepicker() }} style={{ width: '100%', marginTop: 20, borderRadius: 10, borderWidth: 1, height: 50, paddingHorizontal: 20, borderColor: '#aaa', alignItems: 'center', flexDirection: 'row' }}>
                                    <LatoText width={'30%'} text={'Expires on'} marginLeft={5} fontWeight={'500'} fontSize={16} color={colors.Grey2} />
                                    <TextInput editable={false} cursorColor={colors.appTheme} value={moment(this.state.expiresOn).format('DD/MM/YYYY')} placeholderTextColor={'#aaa'} onChangeText={expiresOn => this.setState({ expiresOn })} placeholder="Expires on" style={{ margin: 0, padding: 0, width: '70%', color: colors.appTheme, fontWeight: '400' }} ></TextInput>
                                </TouchableOpacity>
                                <View style={{ width: '100%', marginTop: 20, borderRadius: 10, height: 50, alignItems: 'center', borderWidth: 1, borderColor: '#aaa', paddingLeft: 10 }}>
                                    <Picker
                                        style={{ width: '100%', }}
                                        selectedValue={this.state.selectedValue}
                                        onValueChange={(itemValue, itemIndex) =>
                                            this.setState({ selectedValue: itemValue !== 'Select Status' ? itemValue : null })
                                        }>
                                        <Picker.Item label="Select Status" value="Select Status" />
                                        <Picker.Item label="Fresh" value="Fresh" />
                                        <Picker.Item label="Frozen" value="Frozen" />
                                        <Picker.Item label="Ripe" value="Ripe" />
                                    </Picker>

                                </View>

                            </View>
                            <Button width='70%' onPress={() => this.addItem()} text={"Add this item"} marginBottom={80} />
                        </View>
                        <AppLoader visible={this.state.loading} />
                        {this.state.show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={this.state.expiresOn}
                                mode={this.state.mode}
                                is24Hour={true}
                                onChange={this.onChange}
                            />
                        )}

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

export default connect(state => state, middleware)(AddItem)

