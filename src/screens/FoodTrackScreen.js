import React, { Component } from 'react'
import { FlatList, StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import AppLoader from '../components/AppLoader'
import Header from '../components/Header'
import LatoText from '../components/LatoText'
import middleware from '../store/middleware'
import colors from '../theme/colors'
import DetailCard from '../components/DetailCard'
import Input from '../components/Input'
import PickerComponent from '../components/PickerComponent'
import moment from 'moment'

const options = ["All", "Frozen", "Ripe", "Fresh"]
const dataFood = [{ image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" }, { image: "https://img.freepik.com/free-psd/google-icon-isolated-3d-render-illustration_47987-9777.jpg?w=900&t=st=1685786102~exp=1685786702~hmac=48d1f0dd28c1ef192acf330bc331d385a334d6470cae6b83b9e127a651cd365d", data: '8747389247329', type: "Code-129" },]
class FoodTrackScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            search: "",
            allFood: [],
            filterFood: [],
            loading: false,
            selectedIndex: 0,
            selectedValue: null,
            pickerOpen: false,
            selectedItemIndex: -1
        }
    }


    async componentDidMount() {
        // await this.props._addProduct([])
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.setState({ loading: true, allFood: this.props.products, filterFood: this.props.products })
            this.handler()
            this.setState({ loading: false })
        });


    }
    handler = async () => {
        if (this.props.products.length > 0) {
            for (var i = 0; i < this.props.products.length; i++) {
                let item = this.props.products[i]
                const createdAt = new Date(this.props.products[i]?.createdAt); // Example createdAt date
                const currentDate = new Date(); // Current date
                if (this.props.products[i].status === 'Fresh') {
                    if (currentDate < new Date(this.props.products[i].expiryDate)) {
                        const differenceInTime = currentDate.getTime() - createdAt.getTime();
                        const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));


                        // Check if the difference is equal to or greater than 7 days
                        const isSevenDaysOrMore = differenceInDays >= 7;

                        if (isSevenDaysOrMore) {
                            item.conditionStatus = 'Expire'
                        }
                        else if (differenceInDays === 2) {
                            let item = this.props.products[i]
                            item.conditionStatus = 'Near to expire'
                        }
                        let check = this.props.products
                        check[i] = item

                        await this.props._addProduct(check)
                    }
                    else {
                        item.conditionStatus = 'Expire'
                        let check = this.props.products
                        check[i] = item

                        await this.props._addProduct(check)
                    }
                }
                else if (this.props.products[i].status === 'Frozen') {
                    if (currentDate < new Date(this.props.products[i].expiryDate)) {
                        const yearsDiff = currentDate.getFullYear() - createdAt.getFullYear();
                        const monthsDiff = currentDate.getMonth() - createdAt.getMonth();
                        const totalMonthsDiff = yearsDiff * 12 + monthsDiff;
                        if (totalMonthsDiff >= 6) {
                            item.conditionStatus = 'Expire'
                        }
                        else if (totalMonthsDiff === 5) {
                            item.conditionStatus = 'Near to expire'
                        }
                        let check = this.props.products
                        check[i] = item

                        await this.props._addProduct(check)
                    }
                    else {
                        item.conditionStatus = 'Expire'
                        let check = this.props.products
                        check[i] = item

                        await this.props._addProduct(check)
                    }
                }
            }

        }
    }
    searchHandler = (text) => {
        let temp = this.state.allFood.filter(e =>
            e?.productName?.toLowerCase().includes(text.toLowerCase())
        );
        this.setState({ filterFood: temp, search: text, });
    };
    updateStatus = async (status) => {
        this.setState({ pickerOpen: true, selectedValue: null })
        if (status === 'Ripe') {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3);
            const formattedDate = currentDate.toDateString();
            let data = this.props.products
            data[this.state.selectedItemIndex].expiryDate = formattedDate
            data[this.state.selectedItemIndex].createdAt = formattedDate
            data[this.state.selectedItemIndex].status = status
            delete data[this.state.selectedItemIndex].conditionStatus
            await this.props._addProduct(data)
            this.setState({ selectedIndex: -1, pickerOpen: false, selectedValue: status })
        }
        else {
            let data = this.props.products
            data[this.state.selectedItemIndex].status = status
            await this.props._addProduct(data)
            this.handler()
            this.setState({ selectedIndex: -1, pickerOpen: false, selectedValue: status })
        }

    }
    handleFilter = (item, index) => {
        this.setState({ selectedIndex: index })
        if (item !== 'All') {
            let temp = this.state.allFood.filter(e =>
                e?.status === item
            );
            this.setState({ filterFood: temp });
        }
        else {
            this.setState({ filterFood: this.state.allFood });
        }
    };

    render() {

        return (
            <View style={{ flex: 1, width: '100%' }} >
                <Header title={"Track Product"} />

                <View style={{ flex: 1, paddingHorizontal: 10, width: '100%' }} >

                    <View style={{ flex: 1, width: '100%', alignItems: 'center' }} >
                        <Input value={this.state.search} iconColor={colors.black} onChangeText={search => this.searchHandler(search)} iconName={'search1'} placeholder="Search by title" marginVertical={15} />
                        <View style={{ width: '90%', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                            {
                                options?.map((item, index) =>
                                    <TouchableOpacity key={index} onPress={() => this.handleFilter(item, index)} style={{ padding: 10, minWidth: 50, borderRadius: 5, backgroundColor: this.state.selectedIndex === index ? colors.appTheme : "#E1E4F9", alignItems: 'center' }}>
                                        <LatoText text={item} fontSize={14} color={this.state.selectedIndex === index ? colors.white : "#566E8F"} />
                                    </TouchableOpacity>

                                )
                            }

                        </View>
                        {
                            this.state.filterFood?.length > 0 ?
                                <FlatList
                                    style={{ paddingHorizontal: 20, width: '100%', marginTop: 20, marginBottom: 0 }}
                                    data={this.state.filterFood}
                                    renderItem={({ item, index }) =>

                                        <DetailCard onPress={() => this.setState({ pickerOpen: true, selectedItemIndex: index })} {...{ item }} {...{ index }} key={index} />
                                    }
                                />
                                :
                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }} >
                                    <LatoText text={"Food list empty."} fontSize={18} color={colors.appTheme} />
                                </View>
                        }
                    </View>
                </View>
                <AppLoader visible={this.state.loading} />
                <PickerComponent visible={this.state.pickerOpen} selectedValue={this.state.selectedValue} onValueChange={(e) => this.updateStatus(e)} />
            </View>
        )
    }
}

export default connect(state => state, middleware)(FoodTrackScreen)

