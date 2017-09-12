import api from '../../../services/api';

const likePraise$ = id => api.praise.likePraise.createObservable(id);
const likePraise = id => api.praise.likePraise(id);

const unlikePraise$ = id => api.praise.unlikePraise.createObservable(id);
const unlikePraise = id => api.praise.unlikePraise(id);

export { likePraise$, likePraise, unlikePraise$, unlikePraise };
