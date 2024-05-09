import registerRootComponent from "expo/build/launch/registerRootComponent";
require("@expo/metro-runtime");
import App from "./src/App";

registerRootComponent(App);
