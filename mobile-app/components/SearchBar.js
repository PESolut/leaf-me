import { useEffect } from "react";
import { View, Dimensions, TextInput, Image } from "react-native";
import { useContextProvider } from "../Providers/Provider";
import searchIcon from '../assets/search-icon.png'
import SearchToggle from "./SearchToggle";
import { useSearchToggle } from '../Providers/SearchToggleProvider';
const screenWidth = Dimensions.get('window').width;

const SearchBar = () => {
    const { API, axios } = useContextProvider();
    const { searchText, setSearchText, setSearchResults, setSearchLoading } = useSearchToggle()

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText) {
                searchAPI();
            }
        }, 1000);

        if(!searchText){
            setSearchResults(null)
        }
        return () => clearTimeout(delayDebounceFn);
    }, [searchText]);

    const searchAPI = async () => {
        try {
            setSearchLoading(true);
            const response = await axios.get(`${API}/dispensary/?search=${searchText}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        } finally {
            setSearchLoading(false);
        }
    };
    
    const handleChange = (text) => {
        setSearchText(text)
    }

    return (
        <View style={{
            flexDirection: "row",
            marginLeft: 13.5,
            width: screenWidth-25,
            height: 40,
            backgroundColor: '#D6D6D6',
            borderRadius: 20
        }}>
            <Image style={{
                marginLeft: 10,
                marginTop: 10,
                marginRight: 10,
                height: 20,
                width: 20
            }} source={searchIcon}/>
            <TextInput value={searchText} onChangeText={handleChange} placeholder="Search Leaf Me"/>
            <SearchToggle/>
        </View>
    );
};

export default SearchBar;