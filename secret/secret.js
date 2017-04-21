/**
 * Created by tehetenamasresha on 19/04/2017.
 */
module.exports = {
    auth: {
        user: 'tehetenamas@gmail.com',
        pass: '13besmetit'
    },

    facebook: {
        clientID: '287249895048903', //Facebook login app id
        clientSecret: '2200c4aab88ac12d9adc75cf61bcb17c', //Facebook login secret key
        profileFields: ['email', 'displayName'],
        callbackURL: 'http://localhost:3030/auth/facebook/callback',
        passReqToCallback: true
    }
}