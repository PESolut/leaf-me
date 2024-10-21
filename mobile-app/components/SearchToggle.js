import React, { useEffect } from 'react';
import { TouchableOpacity, View, Image } from "react-native";
import { useSearchToggle } from '../Providers/SearchToggleProvider';

const SearchToggle = () => {
    const { active, toggleActive, toggleView, setViewDispensaries, viewDispensaries } = useSearchToggle();

    useEffect(() => {
        console.log('viewDispensaries changed:', viewDispensaries);
        // Perform any other actions you need when viewDispensaries changes
    }, [viewDispensaries]);

    const handleToggle = () => {
        toggleActive();
        toggleView();
        console.log('toggled');
        console.log('handleToggle(), SearchToggle.js', viewDispensaries);
    };

    return (
        active !== undefined && toggleActive !== undefined && toggleView !== undefined && (
            <TouchableOpacity onPress={handleToggle}>
                <Image 
                    source={active ? require('../assets/activeIcon.png') : require('../assets/inactiveIcon.png')}
                    style={{ width: 24, height: 24}}
                />
            </TouchableOpacity>
        )
    );
};

export default SearchToggle;
