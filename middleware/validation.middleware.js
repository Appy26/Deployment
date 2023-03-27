const validation = (req, res, next) => {
    const { city } = req.body;
    let str = city;
    const regex = /^[a-zA-Z]*$/

    if(regex.test(str)){
        next();
    } else {
        res.send({"ok":false, "msg":"Please do not include any speacial characters or numbers in city name"})
    }
}

module.exports = {
    validation
}