import React from 'react';
import axios from "axios";


/*
function that generates the request url depending on the props
examples of props: tripId, checkpointId, photoId, commentId
*/
export function getLikeUrl(tripId, checkpointId='', photoId='', commentId=''){
    let url = '/api/v1/trip/'+ tripId + '/';
    if (checkpointId) {
        url += 'checkpoint/' + checkpointId + '/';
        if (photoId) {
            url += 'photo/' + photoId + '/';
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        } else {
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        }
    } else {
        if (photoId) {
            url += 'photo/' + photoId + '/';
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        } else {
            if (commentId) {
                url += 'comment/' + commentId + '/';
            }
        }
    }
    return url + 'like/';
}

export function getLikesData(tripId, checkpointId='', photoId='', commentId=''){
        return axios.get(this.getLikeUrl(tripId, checkpointId, photoId, commentId))
    }

export function postLikeData(tripId, checkpointId='', photoId='', commentId=''){
        return axios.post((this.getLikeUrl(tripId, checkpointId, photoId, commentId)), {})
    }
