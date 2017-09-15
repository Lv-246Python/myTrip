export default function (state = null, action) {
    switch (action.type) {
        case 'CHECKPOINT-DETAILS':
        	if((state == null) || (state.id != action.payload.id)){
            return action.payload;
        }else{
            return null;
        }

        case 'CLOSE-DETAILS':
        	return action.payload;

        case 'DELETE-CHECKPOINT-UPDATE_LIST':
        	return action.details;
    }
    return state;
}
