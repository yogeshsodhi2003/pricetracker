'use server'
import { connectToDB } from "@/lib/db/db"

import {User} from "@/models/user.model"

export async function getUser() {
    await connectToDB()
    const userData = await User.findOne({email : 'yogeshsodhi88@gmail.com'})
    const user = JSON.parse(JSON.stringify(userData))
    return user;
}