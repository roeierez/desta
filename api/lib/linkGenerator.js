var randomstring = require("randomstring");

const generateLink = () => {
    return randomstring.generate({
        readable: true
    });
}

export default generateLink;
