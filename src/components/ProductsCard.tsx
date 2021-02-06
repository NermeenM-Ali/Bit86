import { Icon } from 'native-base'
import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, Image, View, Alert } from 'react-native'
import { connect } from 'react-redux'
import colors from '../assets/colors'
import { addToCart, changePropCart, decreaseCounter, increaseCounter, removeFromCart } from '../redux/actions/CartAction'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface ProductCardProps {
    item: {
        id: string | any,
        name: string,
        weight: string,
        price: string,
        product_img: string
    }
    index: any
    navigation: any
    isExist:boolean
    increaseCounter:any
    decreaseCounter:any
    removeFromCart:any,
    addToCart:any
    changePropCart:any
}

interface ProductCardState {
    isPressed: boolean
}
class ProductCard extends Component<ProductCardProps, ProductCardState> {
    constructor(props: ProductCardProps) {
        super(props)
        this.state = {
            isPressed: false
        }
    }
    render() {
        let { isPressed } = this.state
        let { item, navigation,increaseCounter,decreaseCounter, addToCart, removeFromCart,isExist,changePropCart } = this.props
        let { name, weight, price, product_img, id,  } = item
        return (
            <TouchableOpacity style={[styles.container, { borderLeftColor: colors.SHADOW_COLOR, borderLeftWidth: scale(0.18) }]} activeOpacity={1} onPress={() => { navigation.navigate('ProductDetailsScreen', { ProductItem: item }) }}>
                <Image style={styles.img} source={{ uri: product_img }} resizeMode='stretch' />
                <View style={styles.content}>
                    <Text style={styles.productName}>{name}</Text>
                    <Text style={styles.details}>{weight}</Text>
                    <View style={styles.footer}>
                        <Text style={styles.details}>{`EGP ${price}`}</Text>
                        <TouchableOpacity activeOpacity={0.8} onPress={() => {
                            this.setState({ isPressed: !isPressed },()=>{
                                if(!isExist) {
                                    increaseCounter()
                                    addToCart({...item, amount:1})
                                    changePropCart('isExist', false)
                                    changePropCart('inCart', true)
                                }else{
                                    removeFromCart(id)
                                    decreaseCounter()
                                    changePropCart('isExist', false)
                                    changePropCart('inCart', false)
                                }
                            })
                        }}>
                            <Icon
                                name={isPressed ? 'ios-checkmark-circle-sharp' : 'ios-add-circle'}
                                type='Ionicons'
                                style={{ fontSize: moderateScale(22), color: isPressed ? colors.MAIN_COLOR : colors.GRAY_COLOR, opacity: 0.8 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(190),
        height: verticalScale(200),
        borderBottomColor: colors.SHADOW_COLOR,
        borderBottomWidth: scale(0.18),
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: scale(150),
        height: verticalScale(100),
    },
    content: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: scale(150)
    },
    footer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: scale(150),
        flexDirection: 'row',
    },
    productName: {
        fontSize: moderateScale(16),
        fontFamily: 'Poppins-SemiBold',
    },
    details: {
        fontSize: moderateScale(12),
        fontFamily: 'Poppins-Regular',
    },
})

const mapStateToProps = (state: any) => ({
    countNum: state.CartReducer.counter,
    isExist: state.CartReducer.isExist
})

const mapDispatchToProps = {
    increaseCounter,
    decreaseCounter,
    removeFromCart,
    addToCart,
    changePropCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)