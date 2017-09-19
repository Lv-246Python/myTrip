export default function (state = null, action) {
    switch (action.type) {

        case 'ERROR':
            console.log('error reducer payload',action.payload)
            return action.payload;  
    }
    return state;
}
