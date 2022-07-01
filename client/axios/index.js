import axios from 'axios'
import * as Device from 'expo-device';

const baseURL = (!Device.isDevice || Device.productName.includes('emulator')) ? "http://10.0.2.2:8000/" : "http://192.168.1.9:8000/" //CHANGE THE LAST ONE WITH THAT OF YOUR MACHINE

const instance = axios.create({baseURL, timeout: 15000});
export default instance
