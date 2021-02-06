import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native'
import colors from '../assets/colors'
import EmptyPage from '../components/EmptyPage'
import Header from '../components/Header'
import ProductsCard from '../components/ProductsCard'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'
import { Category } from './HomeScreen'

interface ProductsScreenProps {
    navigation: any
    route: {
        params: {
            categoryItem: Category
        }
    }
}

interface ProductsScreenState {
    isTab1Pressed: boolean,
    isTab2Pressed: boolean,
    allProducts: any[]
    SearchVal:any
}
export default class ProductsScreen extends Component<ProductsScreenProps, ProductsScreenState> {
    constructor(props: ProductsScreenProps) {
        super(props)
        this.state = {
            isTab1Pressed: true,
            isTab2Pressed: false,
            allProducts: this.props.route.params.categoryItem.products,
            SearchVal:null
        }
    }
    renderProducts() {
        let { navigation, route } = this.props
        let { categoryItem } = route.params
        let {allProducts} = this.state
        return (
            <FlatList
                numColumns={2}
                data={allProducts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <ProductsCard item={item} index={index} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                style={{ flex: 1, alignSelf: 'center', marginBottom: verticalScale(60) }} 
                ListEmptyComponent={() => <EmptyPage  text={'There is no food with this name!'} />}/>
        )
    }

    getSearchVal = (SearchVal: any) => {
        let { navigation, route } = this.props
        let { categoryItem } = route.params
        let { allProducts } = this.state
        this.setState({ SearchVal }, () => {
            if (SearchVal) {
                let filteredData = allProducts.filter((i: any) => i.name.toLocaleLowerCase().includes(SearchVal.toLocaleLowerCase()))
                this.setState({ allProducts: filteredData })
            } else {
                this.setState({allProducts: categoryItem.products})
            }
        })
    }

    renderFooter() {
        return (
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.footerBtn} onPress={() => { }}>
                    <Text style={styles.footerTxt}>Sort By</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerBtn} onPress={() => { }}>
                    <Text style={styles.footerTxt}>Filter</Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderTabs() {
        let { categoryItem } = this.props.route.params
        let {  name } = categoryItem
        let {isTab2Pressed, isTab1Pressed} = this.state
        return (
            <View style={styles.tabsContainer}>
                <TouchableOpacity style={[styles.tabBtn, {borderBottomColor: isTab1Pressed?colors.MAIN_COLOR: 'white',}]} onPress={() => { this.setState({isTab1Pressed:true, isTab2Pressed:false})}}>
                    <Text style={styles.tabTxt}>{name}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.tabBtn, {borderBottomColor: isTab2Pressed?colors.MAIN_COLOR: 'white',}]} onPress={() => { this.setState({isTab1Pressed:false, isTab2Pressed:true})}}>
                    <Text style={styles.tabTxt}>Tab2</Text>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        let {SearchVal} = this.state
        let { navigation, route } = this.props
        let { categoryItem } = route.params
        let { category_img, name } = categoryItem
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: category_img }} resizeMode='cover' style={styles.img}>
                    <Header isProductsScreen searchVal={SearchVal} getSearchVal={this.getSearchVal}
                    isHome={false} headerTitle={name} navigation={navigation} />
                </ImageBackground>
                {this.renderTabs()}
                {this.renderProducts()}
                {this.renderFooter()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    img: {
        width: '100%',
        height: verticalScale(290),
        marginVertical: verticalScale(3),
        marginHorizontal: scale(3),
    },
    footerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: verticalScale(55),
        backgroundColor: colors.MAIN_COLOR,
        flexDirection: 'row',
    },
    footerBtn: {
        width: '50%',
        height: verticalScale(55),
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTxt: {
        fontSize: moderateScale(16),
        fontFamily: 'Poppins-Regular',
        color: 'white'
    },
    tabsContainer: {
        width: '100%',
        height: verticalScale(50),
        marginBottom: verticalScale(15),
        flexDirection: 'row',
    },
    tabBtn: {
        width: scale(190.5),
        height: verticalScale(55),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: scale(1)
    },
    tabTxt: {
        fontSize: moderateScale(16),
        fontFamily: 'Poppins-Regular',
    },
})