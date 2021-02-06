import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet, ImageBackground, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import colors from '../assets/colors'
import { Category } from '../screens/HomeScreen'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface CategoryCardProps {
    item: Category
    index: any
    navigation: any
}

export default class CategoryCard extends Component<CategoryCardProps> {
    constructor(props: CategoryCardProps) {
        super(props)
    }
    render() {
        let { item, navigation, index } = this.props
        let { category_img, name } = item
        return (
            <>
                {
                    index === 1 ?
                        category_img ? <View >
                            <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => { navigation.navigate('ProductsScreen', {categoryItem:item}) }}>
                                <ImageBackground style={styles.container} imageStyle={{ borderRadius: moderateScale(4) }} source={{ uri: category_img }} resizeMode='cover'>
                                    <View style={styles.shadow} />
                                    <Text style={styles.categoryName}>{name}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                            <ImageBackground style={styles.seperator} imageStyle={{ borderRadius: moderateScale(4) }} source={require('../assets/imgs/seperator.png')} resizeMode='cover'>
                                <Text style={styles.seperatorName}>Lorem ipsum</Text>
                            </ImageBackground>
                        </View> : null :
                        category_img ? <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={() => {navigation.navigate('ProductsScreen', {categoryItem:item}) }}>
                            <ImageBackground style={styles.container} imageStyle={{ borderRadius: moderateScale(4) }} source={{ uri: category_img }} resizeMode='cover'>
                            {/* <LinearGradient start={{x:0, y: 2}} end={{x:-1, y: 0}}  colors={[ 'white',colors.SHADOW_COLOR,'white',]}  style={styles.shadow} /> */}
                                <View style={styles.shadow}/>
                                <Text style={styles.categoryName}>{name}</Text>
                            </ImageBackground>
                        </TouchableOpacity> : null

                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(160),
        height: verticalScale(159),
        marginVertical: verticalScale(3),
        marginHorizontal: scale(3)
    },
    shadow: {
        backgroundColor: colors.SHADOW_COLOR,
        justifyContent: 'flex-end',
        opacity: 0.5,
        width: scale(160),
        height: verticalScale(159),
        borderRadius: moderateScale(4)
    },
    categoryName: {
        fontSize: moderateScale(20),
        fontFamily: 'Poppins-Regular',
        color: 'white',
        position: 'absolute',
        bottom: verticalScale(10),
        left: scale(10)
    },
    seperator: {
        width: scale(325),
        height: verticalScale(95),
        alignSelf:'center',
        marginLeft: scale(-160),
        marginVertical: verticalScale(5),
        justifyContent:'center',
        paddingHorizontal: scale(20)
    },
    seperatorName:{
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Regular',
        color: 'black',
        textAlign:'left'
    }
})