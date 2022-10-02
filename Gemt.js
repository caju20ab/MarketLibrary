const StackNavigation = () => {
    return (
    <Stack.Navigator>
                <Stack.Screen name= "SignIn" component={LogInScreen}/> 
                <Stack.Screen name= "SignUp" component={SignUpScreen}/> 
                <Stack.Screen name= "ConfirmEmail" component={ConfirmEmailScreen}/> 
                <Stack.Screen name= "ForgotPassword" component={ForgotPasswordScreen}/> 
                <Stack.Screen name= "ConfirmPassword" component={ConfirmPasswordScreen}/> 
                <Stack.Screen name= "HomeScreen" component={HomeScreen}/> 
    </Stack.Navigator>
  )
}
   return (
    <NavigationContainer>
    <Tab.Navigator>
                <Tab.Screen name= "No" component={StackNavigation}/> 
                <Tab.Screen name= "HomeScreen" component={HomeScreen}/> 
                <Tab.Screen name= "TableScreen" component={TableScreen}/> 
                <Tab.Screen name= "ArchiveScreen" component={ArchiveScreen}/> 
                <Tab.Screen name= "EventScreen" component={EventScreen}/> 
                <Tab.Screen name= "ContactScreen" component={ContactScreen}/> 
                <Tab.Screen name= "ApartmentScreen" component={ApartmentScreen}/> 
                <Tab.Screen name= "SupportScreen" component={SupportScreen}/> 
    </Tab.Navigator>
    </NavigationContainer>
  )
  }