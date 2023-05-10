import userRepository from "../repositories/userRepository"
import httpStatus from "http-status";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

async function newUser({ email, password }) {

    const usedEmail = await userRepository.findByEmail(email);
    if (usedEmail) throw httpStatus.CONFLICT

    const hashPassword = await bcrypt.hash(password, 10)

    return userRepository.createUser({
        email,
        password: hashPassword
    })
}
async function userLogin({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw httpStatus.NOT_FOUND

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw httpStatus.UNAUTHORIZED;

    const userID = user.id;

    const token = jwt.sign({ userID }, process.env.JWT_SECRET);

    // CRIAR SESSÃO???
    const userSession = await userRepository.findSessionByUserId(userID)
    if (userSession) { await userRepository.updateSession(userSession.id, token) }
    else { await userRepository.createSession(userID, token) }


    return { token }
}

export { newUser, userLogin }