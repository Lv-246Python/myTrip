export default function (state = null, action) {
    switch (action.type) {

        case 'ERROR':
            return action.payload;  
    }
    return state;
}
