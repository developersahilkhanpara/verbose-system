import mongoose from 'mongoose'
import 'dotenv/config'
import { getEnv } from '../config/env'

const DATABASE = getEnv('DATABASE')

const DBConnect = async () => {
    try{
       const Response = await mongoose.connect(DATABASE)
       console.log("connect successfully")
    }catch (e){
        console.log(e)
    }
}

export default DBConnect