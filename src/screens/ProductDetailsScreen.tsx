import { NavigationContainer } from '@react-navigation/native'
import React, { Component } from 'react'
import { View, StyleSheet,Text, TouchableOpacity, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import colors from '../assets/colors'
import Header from '../components/Header'
import { addToCart, changePropCart, increaseCounter, replaceInCart } from '../redux/actions/CartAction'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface ProductDetailsScreenProps {
    navigation: any
    route: {
        params: {
            ProductItem: {
                id: string | any,
                name: string,
                weight: string,
                price: string,
                product_img: string
            }
        }
    }
    inCart:any
    addToCart:any
    changePropCart:any
    increaseCounter:any
    replaceInCart:any
}

interface ProductDetailsScreenState {
    total:number,
    increase:boolean,
    decrease:boolean,
    counter:number
}
class ProductDetailsScreen extends Component<ProductDetailsScreenProps, ProductDetailsScreenState> {
    constructor(props: ProductDetailsScreenProps) {
        super(props)
        this.state={
            counter:1,
            total:Number(this.props.route.params.ProductItem?.price?.replace('LE', '')),
            increase:false,
            decrease:false
        }
    }
    renderQuantitySection(price: string) {
        let {total, increase, decrease, counter} = this.state
        let {route,replaceInCart} = this.props
        let { ProductItem } = route.params
        return (
            <View style={styles.QuantitySection}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.QuantityTxt}>Qty: </Text>
                    <View style={styles.CountContainer}>
                        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={() => { 
                            this.setState({ counter : counter===1? 1: --counter, total: counter>0? Number(price?.replace('LE', ''))*counter: 0},()=>{
                                replaceInCart({...ProductItem, amount:counter})
                            })
                        }}>
                            <Text style={styles.count}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.count}>{counter}</Text>
                        <TouchableOpacity style={styles.addBtn} activeOpacity={0.8} onPress={() => {
                            this.setState({ counter :  ++counter, total: counter>0? Number(price?.replace('LE', ''))*counter: 0},()=>{
                                replaceInCart({...ProductItem, amount:counter})
                            })
                         }}>
                            <Text style={styles.count}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[styles.QuantityTxt, { marginTop: verticalScale(25) }]}>{`Total   `} <Text style={{ color: colors.MAIN_COLOR }}>{`EGP ${total} L.E`}</Text></Text>
            </View>
        )
    }
    renderAboutProduct() {
        return (
            <View style={styles.aboutContainer}>
                <Text style={styles.about}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit facere laudantium, eveniet reiciendis vero sunt sit, impedit, cum neque porro officia et optio corrupti tempora beatae assumenda sequi totam facilis?</Text>
            </View>
        )
    }

    renderAddToCartBtn() {
        let {counter} = this.state
        let {inCart, navigation,route, addToCart, changePropCart, increaseCounter, replaceInCart} = this.props
        let { ProductItem } = route.params
        return(
            <View style={styles.addBtnContainer}>
                <TouchableOpacity activeOpacity={0.8} style={styles.addToCartBtn}
                    onPress={()=>{
                        if(inCart){
                            navigation.navigate('CartScreen')
                            replaceInCart({...ProductItem, amount:counter})
                        }else{
                            addToCart({...ProductItem, amount:counter})
                            increaseCounter()
                            changePropCart('isExist', true)
                        }
                    }}
                >
                    <Text style={styles.addToCartTxt}>{inCart? 'Go To Cart':'ADD TO CART'}</Text>
                </TouchableOpacity>
            </View>
        )
    }
    render() {
        let { navigation, route } = this.props
        let { ProductItem } = route.params
        let { name, weight, price, product_img } = ProductItem
        return (
            <View style={styles.container}>
                <ImageBackground source={{ uri: product_img }} resizeMode='cover' style={styles.img}>
                    <Header searchVal={null} getSearchVal={()=>{}} noSearch={true} isHome={false} headerTitle={name} navigation={navigation} />
                </ImageBackground>
                <View style={styles.content}>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.details}>{weight}</Text>
                    <Text style={styles.price}>{`EGP ${price}`}</Text>
                </View>
                {this.renderQuantitySection(price)}
                {this.renderAboutProduct()}
                {this.renderAddToCartBtn()}
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
        height: verticalScale(280),
        marginVertical: verticalScale(3),
        marginHorizontal: scale(3)
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
    productName: {
        fontSize: moderateScale(20),
        fontFamily: 'Poppins-Medium',
    },
    details: {
        fontSize: moderateScale(22),
        fontFamily: 'Poppins-Light',
        paddingVertical: verticalScale(10)
    },
    price: {
        fontSize: moderateScale(30),
        fontFamily: 'Poppins-Light',
    },
    addBtn: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingVertical: verticalScale(10)
    },
    QuantitySection: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: scale(20),
        width: '100%',
        paddingTop: verticalScale(30)
    },
    QuantityTxt: {
        fontSize: moderateScale(22),
        fontFamily: 'Poppins-Light',
    },
    count: {
        fontSize: moderateScale(16),
        fontFamily: 'Poppins-Medium',
        marginTop: verticalScale(5)
    },
    CountContainer: {
        width: scale(84),
        height: verticalScale(31),
        borderColor: 'black',
        borderWidth: scale(0.3),
        marginLeft: scale(20),
        borderRadius: moderateScale(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    about: {
        fontSize: moderateScale(16),
        color: '#C1C1C1',
        fontFamily: 'Poppins-Regular',
        textAlign:'justify'
    },
    aboutContainer:{
        paddingHorizontal: scale(20), 
        paddingVertical: verticalScale(20)
    },
    addBtnContainer:{
        position:'absolute',
        left:0,
        right:0,
        bottom:0,
        height: verticalScale(75),
        justifyContent:'center',
        alignItems:'center',
    },
    addToCartBtn:{
        width: scale(325),
        height: verticalScale(50),
        borderRadius: moderateScale(10),
        backgroundColor: colors.MAIN_COLOR,
        justifyContent:'center',
        alignItems:'center',
    },
    addToCartTxt:{
        fontSize: moderateScale(22),
        color: 'white',
        fontFamily: 'Poppins-Medium',
    }
})

const mapStateToProps = (state: any) => ({
    inCart: state.CartReducer.inCart
})

const mapDispatchToProps = {
    addToCart,
    changePropCart,
    increaseCounter,
    replaceInCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsScreen)