import { createStackNavigator } from "react-navigation"
import { SignInScreen } from "../screens/sign-in-screen"
import { LikerLandOAuthScreen } from "../screens/likerland-oauth-screen"

export const AuthNavigator = createStackNavigator(
  {
    SignIn: { screen: SignInScreen },
    LikerLandOAuth: { screen: LikerLandOAuthScreen }
  },
  {
    headerMode: "none",
  },
)
