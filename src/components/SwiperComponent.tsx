import { Icon } from 'native-base'
import React, { Component } from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Swiper from 'react-native-swiper'
import colors from '../assets/colors'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface SwiperComponentProps {
    navigation: any
    inHome: boolean
    swiperImg1: any,
    swiperImg2: any,
    swiperImg3: any
    swiperTitle1?: string | any
    swiperTitle2?: string | any
    swiperTitle3?: string | any
    swiperContent1?: string | any
    swiperContent2?: string | any
    swiperContent3?: string | any
}

interface SwiperComponentState {
    indexPosition: number
}
export default class SwiperComponent extends Component<SwiperComponentProps, SwiperComponentState>{
    constructor(props: SwiperComponentProps) {
        super(props)
        this.state = {
            indexPosition: 0
        }
    }
    renderSwiper() {
        let { indexPosition } = this.state
        let { inHome, swiperImg1, swiperImg2, swiperImg3, swiperContent1, swiperContent2, swiperContent3, swiperTitle1, swiperTitle2, swiperTitle3 } = this.props
        return (
            <Swiper
                showsPagination
                autoplay={inHome ? true : false}
                activeDotColor={colors.MAIN_COLOR}
                dotColor='white'
                activeDotStyle={{ width: 12, height: 12, borderRadius: 6, marginBottom: inHome ? 5 : 20 }}
                dotStyle={{ width: 12, height: 12, borderRadius: 6, marginBottom: inHome ? 5 : 20, borderColor: colors.MAIN_COLOR, borderWidth: 0.5 }}
                key={Date.now()}
                autoplayTimeout={1.5}
                index={indexPosition}
                removeClippedSubviews={false}>
                {this.renderIntroSlide(swiperImg1, swiperTitle1, swiperContent1)}
                {this.renderIntroSlide(swiperImg2, swiperTitle2, swiperContent2)}
                {this.renderIntroSlide(swiperImg3, swiperTitle3, swiperContent3)}
            </Swiper>
        )
    }
    renderIntroSlide(image: any, title: string, content: string) {
        let { inHome } = this.props
        return (
            <View style={inHome ? styles.introSlideHome : styles.introSlideView}>
                {inHome ?
                    <ImageBackground resizeMode='cover' style={{ justifyContent: 'center', width: '100%', height: verticalScale(250), alignSelf: 'center' }} source={image}>
                        <Text style={styles.percentTxt}>20%</Text>
                        <Text style={styles.discountTxt}>Discount</Text>
                    </ImageBackground> :
                    <Image resizeMode='contain' source={image} />}
                <Text style={styles.introTitle}>{title}</Text>
                <Text style={styles.introContent}>{content}</Text>
            </View>
        )
    }

    renderSwiperFooter() {
        let { indexPosition } = this.state
        let { navigation } = this.props
        return (
            <View style={[styles.footerContainer, { justifyContent: indexPosition !== 0 ? 'space-between' : 'flex-end' }]}>
                {
                    indexPosition !== 0 ?
                        <TouchableOpacity activeOpacity={0.8} style={styles.footerBtn} onPress={() => this.setState({ indexPosition: --indexPosition })}>
                            <Icon
                                name='keyboard-arrow-left'
                                type='MaterialIcons'
                                style={{ fontSize: moderateScale(30), color: 'white' }} />
                        </TouchableOpacity> : null
                }
                {
                    indexPosition !== 2 ?
                        <TouchableOpacity activeOpacity={0.8} style={styles.footerBtn} onPress={() => this.setState({ indexPosition: ++indexPosition })}>
                            <Icon
                                name='keyboard-arrow-right'
                                type='MaterialIcons'
                                style={{ fontSize: moderateScale(30), color: 'white' }} />
                        </TouchableOpacity> : null
                }

                {
                    indexPosition === 2 ?
                        <TouchableOpacity activeOpacity={0.8} style={styles.footerBigBtn} onPress={() => navigation.navigate('HomeScreen')}>
                            <Text style={styles.footerBtnTxt}>Get started</Text>
                        </TouchableOpacity> : null
                }
            </View>
        )
    }
    render() {
        let { inHome } = this.props
        return (
            <>
                {
                    inHome ?
                        <View style={styles.container}>
                            {this.renderSwiper()}
                        </View> :
                        <View style={styles.introcontainer}>
                            {this.renderSwiper()}
                            {this.renderSwiperFooter()}
                        </View>
                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    introcontainer: {
        flex: 1
    },
    container: {
        width: '100%',
        height: verticalScale(250),
    },
    introSlideView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    introSlideHome: {
        width: '100%',
        height: verticalScale(250),
        alignSelf: 'center',
    },
    introTitle: {
        fontSize: moderateScale(30),
        fontFamily: 'Poppins-Medium',
        marginTop: verticalScale(80)
    },
    introContent: {
        fontSize: moderateScale(15),
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        maxWidth: scale(335),
        marginTop: verticalScale(20)
    },
    percentTxt: {
        fontSize: moderateScale(50),
        fontFamily: 'Poppins-SemiBold',
        color: 'white',
        paddingLeft: scale(30)
    },
    discountTxt: {
        fontSize: moderateScale(20),
        fontFamily: 'Poppins-Regular',
        color: 'white',
        paddingLeft: scale(40),
        opacity: 0.4
    },
    footerContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: verticalScale(100),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(30)
    },
    footerBtn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerBigBtn: {
        width: scale(110),
        height: verticalScale(50),
        borderRadius: moderateScale(40),
        backgroundColor: colors.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerBtnTxt: {
        fontSize: moderateScale(15),
        fontFamily: 'Poppins-Medium',
        color: 'white',
        maxWidth: 120
    }
})