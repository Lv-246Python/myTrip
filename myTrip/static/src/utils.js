export let logged = () => document.cookie.indexOf('sessionid') != -1;

export const EMAIL_REGEXP = /.+@.+\..+/;

export function emailIsNotValid(email) {
    if (email == '') {
            return 'This field is required';
        } else if (email.match(EMAIL_REGEXP) == null) {
            return 'Email fields is not in valid form';
        } else {
            return ''
        }
}

export function fieldIsEmpty(field) {
    return field == '' ? 'This field is required':'';
}

const getCookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function userId(){
    let id = getCookie('user_id');
    id = id === "" ? null : +id;
    return id;
}

export function moveCaretAtEnd(e) {
  let temp_value = e.target.value;
  e.target.value = '';
  e.target.value = temp_value;
}
