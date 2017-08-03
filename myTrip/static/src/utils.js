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
