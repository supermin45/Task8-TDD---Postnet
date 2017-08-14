function main(post) {

    return (post.indexOf('|') === -1) ? postEncode(post) : postDecode(post);
}
function postEncode(post) {
    let arr = (post.length === 5 || post.length === 9) ? post.split('') : post.split('').filter((e) => {
            return e !== '-';
    });

    let barcode = arr.map((e) => {
        let num = parseInt(e);
        return allBarcodes[num];
    });

    return '| ' + barcode.join(' ') + ' ' + calculateCD(arr) + ' |';
}
function calculateCD(arr) {
    let sum = arr.reduce((x, y) => {
            return parseInt(x) + parseInt(y);
    }, 0);
    let CDNumber = (100 - sum) % 10;
    return allBarcodes[CDNumber];
}
function postDecode(post) {
    let newBarcode = post.split(' ').filter((e) => {
            return e !== '|';
    });
    newBarcode.pop();
    let postNumber = newBarcode.map((e) => {
            return allBarcodes.indexOf(e);
    });
    let result = postNumber.join('');

    return (result.length === 5) ? result : result.substr(0, 5) + '-' + result.substr(5);
}
const allBarcodes = ['||:::', ':::||', '::|:|', '::||:', ':|::|', ':|:|:', ':||::', '|:::|', '|::|:', '|:|::'];

module.exports = {
    main: main,
    postEncode: postEncode,
    postDecode: postDecode
};