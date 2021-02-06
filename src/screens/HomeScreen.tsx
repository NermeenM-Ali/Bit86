import React, { Component } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import colors from '../assets/colors'
import CategoryCard from '../components/CategoryCard'
import EmptyPage from '../components/EmptyPage'
import Header from '../components/Header'
import SwiperComponent from '../components/SwiperComponent'
import { verticalScale } from '../utils/Scaling'

interface HomeScreenProps {
    navigation: any
}

export interface Category {
    id: string | any,
    name: string,
    category_img: string,
    products: [
        {
            id: string | any,
            name: string,
            weight: string,
            price: string,
            product_img: string
        }
    ]
}
interface HomeScreenState {
    categories: Category[]
    isLoading: boolean
    SearchVal: any
}
//   let filteredData = DATA.filter((i:any)=> i.NameEnglish.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
//   setDATA(filteredData)

export default class HomeScreen extends Component<HomeScreenProps, HomeScreenState> {
    constructor(props: HomeScreenProps) {
        super(props)
        this.state = {
            isLoading: false,
            SearchVal: null,
            categories: [{
                id: "",
                name: "",
                category_img: "",
                products: [
                    {
                        id: "",
                        name: "",
                        weight: "",
                        price: "",
                        product_img: ""
                    }
                ]
            }]
        }
    }

    componentDidMount() {
        this.FetchData()
    }
    FetchData() {
        this.setState({ isLoading: true })
        fetch('https://5bcce576cf2e850013874767.mockapi.io/task/categories')
            .then((response) => response.json())
            .then((categories) => {
                this.setState({ categories, isLoading: false })
            }).catch((error) => { this.setState({ isLoading: false }) });
    }

    getSearchVal = (SearchVal: any) => {
        let { categories } = this.state
        this.setState({ SearchVal }, () => {
            if (SearchVal) {
                let filteredData = categories.filter((i: any) => i.name.toLocaleLowerCase().includes(SearchVal.toLocaleLowerCase()))
                this.setState({ categories: filteredData })
            } else {
                this.FetchData()
            }
        })
    }
    renderCategories() {
        let { navigation } = this.props
        let { categories } = this.state
        return (
            <FlatList
                numColumns={2}
                data={categories}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => <CategoryCard item={item} index={index} navigation={navigation} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                style={{ flex: 1, alignSelf: 'center' }} 
                ListEmptyComponent={() => <EmptyPage  text={'There is no food with this name!'} />}/>
        )
    }

    render() {
        let { navigation } = this.props
        let { isLoading, SearchVal } = this.state
        return (
            <View style={styles.container}>
                <Header isHome navigation={navigation} searchVal={SearchVal} getSearchVal={this.getSearchVal} />
                <SwiperComponent inHome navigation={navigation}
                    swiperImg1={require('../assets/imgs/homeSwipe.png')}
                    swiperImg2={require('../assets/imgs/homeSwipe.png')}
                    swiperImg3={require('../assets/imgs/homeSwipe.png')} />
                {isLoading ?
                    <ActivityIndicator color={colors.MAIN_COLOR} size='small' style={{ marginTop: verticalScale(200) }} /> :
                    this.renderCategories()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})