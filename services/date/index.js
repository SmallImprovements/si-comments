import moment from 'moment';
export function toRelativeDate(date) {
    moment.updateLocale('en', {
        relativeTime: {
            s: 'a moment',
            m: '%d minute',
            mm: '%d mins',
            h: '1 hr',
            hh: '%d hrs',
            d: 'Yesterday',
        },
    });
    return moment(date).fromNow(true) + ' ago';
}
