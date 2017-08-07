export let logged = () => document.cookie.indexOf('sessionid') != -1;

export const EMAIL_REGEXP = /.+@.+\..+/;
export const ALPHA_REGEXP = /^[a-z]+$/i;
export const DIGIT_REGEXP = /^[0-9]+$/;

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


export function onlyAlpha(text) {
    if (ALPHA_REGEXP.test(text) == false) {
        return false;
    } else {
        return true
    }

}

export function onlyDigit(numbers) {
    if (DIGIT_REGEXP.test(numbers) == false) {
        return false;
    } else {
        return true
    }
}