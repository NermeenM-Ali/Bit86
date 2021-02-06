import { Icon } from 'native-base'
import React, { Component } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import colors from '../assets/colors'
import { changePropCart, decreaseCounter, removeFromCart } from '../redux/actions/CartAction'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface CartRowProps {
    item: {
        id: string | any,
        name: string,
        weight: string,
        price: string,
        product_img: string
        amount:number
    }
    index: number
    removeFromCart: any
    decreaseCounter:any
    changePropCart:any
}

class CartRow extends Component<CartRowProps>{
    constructor(props: CartRowProps) {
        super(props)
    }
    render() {
        let { item, removeFromCart,decreaseCounter,changePropCart } = this.props
        let { name, weight, price, product_img, id, amount } = item
        console.log({item})
        return (
            <View>
                <View style={[styles.Container, { borderColor: colors.MAIN_COLOR, borderWidth: scale(1) }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: product_img }} style={styles.imageContainer} resizeMode='cover' />
                        <View style={styles.infoSection}>
                            <Text style={styles.details}>{name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-start', width: scale(220), marginTop: verticalScale(10), marginBottom: verticalScale(5) }}>
                                <View style={styles.dot} />
                                <Text style={styles.txt}>{`Weight: ${weight}`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', width: scale(220), marginTop: verticalScale(5), marginBottom: verticalScale(5) }}>
                                <View style={styles.dot} />
                                <Text style={styles.txt}>{`Price: ${price} x ${amount}` }</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.clear}
                        onPress={() => {
                            decreaseCounter()
                            removeFromCart(id)
                            changePropCart('isExist', false)
                            changePropCart('itemID', 0)
                        }}>
                        <Icon
                            name='trash'
                            type='EvilIcons'
                            style={{ color: 'red', fontSize: moderateScale(30) }} />
                    </TouchableOpacity>
                </View>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        width: scale(346),
        // paddingVertical: verticalScale(5),
        // height: verticalScale(80),
        alignSelf: 'center',
        borderRadius: moderateScale(8),
        marginTop: verticalScale(15),
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: scale(1),
        // elevation: scale(1),
        shadowColor: '#B2B2B229',
        shadowRadius: scale(5),
        shadowOpacity: scale(15),
        shadowOffset: { width: scale(-5), height: verticalScale(10) },
        overflow: 'hidden'
        // paddingVertical: verticalScale(20)
    },
    imageContainer: {
        width: scale(65),
        height: verticalScale(65),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GRAY_COLOR,
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        marginVertical: verticalScale(5)
        // marginLeft: scale(38)
    },
    img: {
        width: scale(40),
        height: scale(50)
    },
    infoSection: {
        width: scale(260),
        marginTop: verticalScale(5),
        paddingHorizontal: scale(10),
        justifyContent: 'center',
    },
    clear: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: scale(35),
        height: '100%',//verticalScale(79),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderTopRightRadius: moderateScale(8),
        borderBottomRightRadius: moderateScale(8),
        borderLeftColor: 'lightgray',
        borderLeftWidth: scale(0.5)
    },
    txt: {
        color: "black",
        fontFamily: 'Poppins-Regular',
        fontSize: moderateScale(10),
        alignSelf: 'center',
        marginRight: scale(7)
    },
    dot: {
        backgroundColor: "#CBCED1",
        alignSelf: 'center',
        width: scale(4),
        height: scale(4),
        borderRadius: moderateScale(4) / 2,
        marginHorizontal: scale(5),
        marginTop: verticalScale(2)
    },
    details: {
        color: "#979DA3",
        fontFamily: 'Poppins-Regular',
        fontSize: moderateScale(14),
        textAlign: 'justify',
        marginLeft: scale(5),
        marginTop: verticalScale(5),
        maxWidth: scale(220)
    },
})

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = {
    removeFromCart,
    decreaseCounter,
    changePropCart
}

export default connect(mapStateToProps, mapDispatchToProps)(CartRow)