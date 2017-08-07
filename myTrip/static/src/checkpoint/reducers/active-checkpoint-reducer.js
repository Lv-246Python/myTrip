export default function (state = null, action) {
    switch (action.type) {
        case 'CHECKPOINT-DETAILS':
        	if((state == null) || (state.id != action.payload.id)){
        		console.log(state)
            return action.payload;
        }else{
        	console.log(state)
            return null;
        }

        case 'CLOSE-DETAILS':
        	return action.payload;

        case 'TEST':
        console.log('active reducer test dispatch',action.test)
        	return action.status;

        case 'DELETE-CHECKPOINT-UPDATE_LIST':
        	return action.details;
    }
    return state;
}
