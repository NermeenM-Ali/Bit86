import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, FlatList} from 'react-native'
import { connect } from 'react-redux'
import colors from '../assets/colors'
import CartRow from '../components/CartRow'
import Header from '../components/Header'

interface CartScreenProps{
    navigation:any
    cartItems:{
        id: string | any,
        name: string,
        weight: string,
        price: string,
        product_img: string
    }[]
}
class CartScreen extends Component<CartScreenProps>{
    constructor(props:CartScreenProps) {
        super(props)
    }

    render() {
        let {navigation, cartItems} = this.props
        return(
            <View style={{flex:1, backgroundColor:'white'}}>
            <Header isHome={false} isProductsScreen noSearch headerTitle='Cart' bgColor={colors.MAIN_COLOR} noCart navigation={navigation} searchVal='' getSearchVal={()=>{}}/>
                <FlatList
                    data={cartItems}
                    keyExtractor={(item, index)=> index.toString()}
                    // @ts-ignore
                    renderItem={({item, index})=> (<CartRow item={item} index={index}/>)}
                    style={{flex:1}}/>
            </View>
        )
    }
}

const mapStateToProps = (state: any) => ({
    cartItems: state.CartReducer.cartItems
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen)