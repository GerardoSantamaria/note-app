const helpers = {};

helpers.getViewUser = (user) => {
    if(!user){
        return null;
    }
    return {
        name: user.name,
        email: user.email,
    }
}

module.exports = helpers;