import React, { Component } from 'react'
import { View, StyleSheet} from 'react-native'
import SwiperComponent from '../components/SwiperComponent'
import { moderateScale, scale, verticalScale } from '../utils/Scaling'

interface IntroScreenProps {
    navigation: any
}

export default class IntroScreen extends Component<IntroScreenProps> {
    constructor(props: IntroScreenProps) {
        super(props)
    }
    render() {
        let {navigation} = this.props
        return (
            <View style={styles.container}>
                <SwiperComponent inHome={false} navigation={navigation}
                    swiperImg1={require('../assets/imgs/slide1.png')}
                    swiperImg2={require('../assets/imgs/slide2.png')}
                    swiperImg3={require('../assets/imgs/slide3.png')}
                    swiperTitle1='Lorem ipsum' swiperTitle2='Lorem ipsum' swiperTitle3='Lorem ipsum'
                    swiperContent1=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptatibus ut illo voluptate harum. Ut fugit obcaecati blanditiis, totam a hic maxime quae! Expedita temporibus perferendis ea laudantium quas quod.'
                    swiperContent2=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptatibus ut illo voluptate harum. Ut fugit obcaecati blanditiis, totam a hic maxime quae! Expedita temporibus perferendis ea laudantium quas quod.'
                    swiperContent3=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet voluptatibus ut illo voluptate harum. Ut fugit obcaecati blanditiis, totam a hic maxime quae! Expedita temporibus perferendis ea laudantium quas quod.' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
})