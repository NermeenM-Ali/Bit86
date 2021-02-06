import React from 'react'
import {
    View, Image, Text, Dimensions, I18nManager
} from 'react-native'
import { moderateScale, verticalScale } from '../utils/Scaling';
const { height } = Dimensions.get('window')

// @ts-ignore
export default EmptyPage = (props:any) => {
    const { image, error, loading, text, onReload, empty, headText, center } = props
    return(
        //@ts-ignore
        <View style={ styles.container } >
            {
                
                //@ts-ignore
                <View style={ styles.container } >
                    {
                        text ?
                        //@ts-ignore
                        <Text style={ [styles.textStyle,{marginTop: verticalScale(150)}] } >{ text }</Text>:null
                    }
                </View>
            }
        </View>
    )
}

const styles = {
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'center'
    },
    textStyle: {
        color: '#8F8F8F',
        fontSize: moderateScale(15),
        textAlign: 'center',
        textAlignVertical:'center',
        fontFamily: 'Poppins-Regular',        // width: 150       
    },

}