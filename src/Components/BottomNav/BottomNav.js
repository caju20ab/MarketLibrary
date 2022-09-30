import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../Screens/HomeSceen/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";


//https://www.youtube.com/watch?v=gPaBicMaib4
const Tab = createBottomTabNavigator ();

const Tabs = () => {
    return (
    <NavigationContainer>
    <Tab.Navigator>
        <Tab.Screen name= "Home" component={HomeScreen} />
    </Tab.Navigator>
    </NavigationContainer>
    )
    
}

export default Tabs