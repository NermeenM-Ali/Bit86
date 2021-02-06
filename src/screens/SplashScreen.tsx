import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import colors from '../assets/colors'

interface SplashScreenProps {
    navigation: any
}
export default class SplashScreen extends Component<SplashScreenProps>{
    constructor(props: SplashScreenProps) {
        super(props)
    }
    componentDidMount() {
        let { navigation } = this.props
        setTimeout(() => {
            navigation.replace('IntroScreen')
        }, 2000)
    }
    render() {
        return (
            <View style={styles.container}>
                <Image resizeMode='contain' source={require('../assets/imgs/FM.png')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.MAIN_COLOR,
    }
})