const request = async ( url, params = {}, method = 'GET', headers = {'Content-Type': 'application/json'} ) => {
    let options = {
        method,
        headers
    };
    if ( 'GET' === method ) {
        url = url + '?' + ( new URLSearchParams( params ) ).toString();
    } else {
        options.body = JSON.stringify( params );
    }
    
    const response = await fetch( url, options );
    const passCode = [200, 201, 302];
    const content = await response.json();
    if ( passCode.includes(response.status) ) {
        const result = {
            message: content.message,
            success: true,
            data: content.data
        }
        return result;
    } else {
        const result = {
            message: content.message,
            success: false,
            data: {}
        }
        return result;
    }
};

const get = ( url, params, headers ) => request( url, params, 'GET', headers );
const post = ( url, params, headers ) => request( url, params, 'POST', headers );

module.exports = {
    get,
    post
}