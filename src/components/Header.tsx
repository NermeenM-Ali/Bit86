import { Badge, Icon } from 'native-base'
import React, { Component } from 'react'
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import { connect } from 'react-redux'
import colors from '../assets/colors'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface HeaderProps {
    navigation: any
    isHome: boolean
    headerTitle?: string
    getSearchVal: Function
    searchVal: any
    noSearch?: boolean
    countNum?: any
    bgColor?:string
    noCart?:boolean
    isFromCart?:boolean
    isProductsScreen?:boolean
}
interface HeaderState {
    isSearchPressed: boolean
}
class Header extends Component<HeaderProps, HeaderState>{
    constructor(props: HeaderProps) {
        super(props)
        this.state = {
            isSearchPressed: false
        }
    }
    // @observable isSearchPressed = false

    // @action toggleSearchInput=()=> {
    //     this.isSearchPressed = true
    //     console.log(this.isSearchPressed)
    // }

    render() {
        let { isSearchPressed } = this.state
        let { isHome, headerTitle, navigation, getSearchVal, searchVal, noSearch, countNum,bgColor, noCart,isProductsScreen } = this.props
        return (
            <View style={[styles.container, { backgroundColor: isHome ? 'white' :bgColor?bgColor: 'transparent' }]}>
                {isHome ? <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
                    <Icon
                        name='menu'
                        type='Feather'
                        style={{ fontSize: moderateScale(27), color: colors.BLUE_COLOR }} />
                </TouchableOpacity> :
                    <TouchableOpacity style={styles.Btn} activeOpacity={0.8} onPress={() => { navigation.goBack() }}>
                        <Icon
                            name='keyboard-arrow-left'
                            type='MaterialIcons'
                            style={{ fontSize: moderateScale(30), color: isProductsScreen?'white': colors.BLUE_COLOR, opacity: 0.8 }} />
                    </TouchableOpacity>
                }
                {
                    isSearchPressed ?
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor='lightgray'
                            autoCorrect={false}
                            autoCapitalize='none'
                            keyboardType='default'
                            style={styles.input}
                            returnKeyType='search'
                            value={searchVal}
                            onChangeText={(val) => getSearchVal(val)}
                            onSubmitEditing={() => Keyboard.dismiss()} />
                        : <View style={styles.center}>
                            <Text style={[styles.centerTxt, {color: isProductsScreen?'white': colors.BLUE_COLOR,}]}>{headerTitle}</Text>
                        </View>
                }
                <View style={{ flexDirection: 'row' }}>
                    {!noSearch ? <TouchableOpacity activeOpacity={0.8} style={{ marginHorizontal: scale(15) }} onPress={() => { this.setState({ isSearchPressed: true }) }}>
                        <Icon
                            name='ios-search'
                            type='Ionicons'
                            style={{ fontSize: moderateScale(22), color: isProductsScreen?'white': colors.BLUE_COLOR, opacity: 0.8 }} />
                    </TouchableOpacity> : null}
                    {!noCart?<TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('CartScreen') }}>
                        {countNum !== 0 ? <Badge style={styles.badge}>
                            <Text style={styles.countTxt}>{countNum}</Text>
                        </Badge> : null}
                        <Icon
                            name='cart'
                            type='EvilIcons'
                            style={{ fontSize: moderateScale(27), color: isProductsScreen?'white': colors.BLUE_COLOR }} />
                    </TouchableOpacity>: <View style={{width: scale(45)}}/>}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: verticalScale(70),
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: scale(20),
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingHorizontal: scale(10)
    },
    centerTxt: {
        textAlign: 'center',
        fontSize: moderateScale(22),
        fontFamily: 'Poppins-Regular',
        marginLeft: scale(40),
        color: 'white'
    },
    Btn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: scale(220),
        height: verticalScale(50),
        backgroundColor: '#f9f9f9',
        borderRadius: moderateScale(30),
        paddingHorizontal: scale(20),
        color: 'black',
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Regular',
        borderColor: 'lightgray',
        borderWidth: scale(0.5),
        marginHorizontal: scale(10),
    },
    countTxt: {
        color: 'white',
        fontSize: moderateScale(12),
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        alignItems:'center' ,
        paddingVertical: verticalScale(7)       
    },
    badge: {
        backgroundColor: colors.MAIN_COLOR,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: scale(-8),
        bottom: verticalScale(15)
    }
})

const mapStateToProps = (state: any) => ({
    countNum: state.CartReducer.counter
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Header)