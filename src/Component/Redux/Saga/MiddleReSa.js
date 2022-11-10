import { call, put, takeEvery } from 'redux-saga/effects'

async function FilmAPI() {
  var res = await fetch('http://localhost:3003/movie');
  var data = await res.json()
  console.log(data)
  console.log(data.now)
  return data.now
}

async function GetMovieNow() {
  var res = await fetch('http://localhost:3003/movie');
  var data = await res.json();
  console.log(data.now)
  return data.now;
}

async function GetMovieSoon() {
  var res = await fetch('http://localhost:3003/movie');
  var data = await res.json();
  console.log(data.soon)
  return data.soon;
}

async function CinAPI() {
  var res = await fetch('http://localhost:3003/cinema');
  var cin = await res.json()
  console.log(cin)
  return cin
}

async function CinBranch(cineplex) {
  var res = await fetch(`http://localhost:3003/cinema/branch?cineplex=${cineplex}&lastIndex=0&count=1000`);
  var cinBranch = await res.json()
  console.log(cinBranch);
  return cinBranch.Items
}

async function Schedule(cineplex, ApiCinemaId, date) {
  var res = await fetch(`http://localhost:3003/cinema/branch/schedule?cineplex=${cineplex}&apiCinemaId=${ApiCinemaId}&date=${date}`);
  var schedule = await res.json()
  console.log(schedule);
  return ({ ...schedule, cineplex, ApiCinemaId, date })
}

async function Schedule1(cineplex, ApiCinemaId, date) {
  var res = await fetch(`http://localhost:3003/cinema/branch/schedule?cineplex=${cineplex}&apiCinemaId=${ApiCinemaId}&date=${date}`);
  var schedule = await res.json()
  console.log(schedule);
  return ({ ...schedule, cineplex, ApiCinemaId, date })
}

async function GetDetailMovie(ApiFilmId) {
  var res = await fetch(`http://localhost:3003/movie/detail?apiFilmId=${ApiFilmId}`);
  var data = await res.json();
  console.log(data)
  return data;
}

async function GetMovieSchedule(ApiFilmId, date) {
  var res = await fetch(`http://localhost:3003/movie/schedule?apiFilmId=${ApiFilmId}&date=${date}`);
  var data = await res.json();
  console.log(data)
  return { ...data, ApiFilmId, date };
}

async function GetCinBranch(ApiFilmId, date, Cineplex) {
  var res = await fetch(`http://localhost:3003/movie/schedule?apiFilmId=${ApiFilmId}&date=${date}&cineplex=${Cineplex}`);
  var data = await res.json();
  console.log(data)
  return data.Cinemas;
}

async function GetCommentMovie1(ApiFilmId) {
  console.log(ApiFilmId)
  var res = await fetch(`http://localhost:3003/movie/comment?apiFilmId=${ApiFilmId}`);
  var data = await res.json();
  console.log(data);
  return data
}

//Generator function


function* getFilmNow({ type, payload }) {
  var lsFilm = yield call(FilmAPI);
  yield put({ type: "SetFilms", payload: lsFilm })
  console.log(lsFilm);
}

function* getMovieNow({ type, payload }) {
  var lsMovieNow = yield call(GetMovieNow)
  yield put({ type: "SetMovieNow", payload: lsMovieNow })
}

function* getMovieSoon({ type, payload }) {
  var lsMovieSoon = yield call(GetMovieSoon)
  yield put({ type: "SetMovieSoon", payload: lsMovieSoon })
}

function* getCins({ type, payload }) {
  var lsCins = yield call(CinAPI);
  yield put({ type: "SetCins", payload: lsCins })
  console.log(lsCins);
}

function* getBranch({ type, payload }) {
  var lsBranchs = yield call(CinBranch, payload.cineplex);
  yield put({ type: "SetBranch", payload: lsBranchs })
  console.log(lsBranchs);
}

function* getSchedule({ type, payload }) {
  var lsSchedule = yield call(Schedule, payload.cineplex, payload.ApiCinemaId, payload.date);
  yield put({ type: "SetSchedule", payload: lsSchedule })
  console.log(lsSchedule);
}

function* getSchedule1({ type, payload }) {
  var lsSchedule = yield call(Schedule1, payload.cineplex, payload.ApiCinemaId, payload.date);
  yield put({ type: "SetSchedule", payload: lsSchedule })
  console.log(lsSchedule);
}

function* getDetailMovie({ type, payload }) {
  var lsDetailMovie = yield call(GetDetailMovie, payload.ApiFilmId);
  yield put({ type: "SetDetailMovie", payload: lsDetailMovie })
  console.log(lsDetailMovie);
}

function* getMovieShedule({ type, payload }) {
  var lsMovieSchedule = yield call(GetMovieSchedule, payload.ApiFilmId, payload.date);
  yield put({ type: "SetScheduleMovie", payload: lsMovieSchedule })
  console.log(lsMovieSchedule);
}

function* getCinBranch({ type, payload }) {
  var lsCinBranch = yield call(GetCinBranch, payload.ApiFilmId, payload.date, payload.Cineplex);
  yield put({ type: "SetCinBranch", payload: lsCinBranch })
  console.log(payload.ApiFilmId, payload.date, payload.Cineplex);
}

function* getUserInfo({ type, payload }) {
  var user = yield call(GetCinBranch, payload.email, payload.password);
  yield put({ type: "SetUserInfo", payload: user })
}

function* getsCommentMovie({ type, payload }) {
  console.log(payload);
  var commentMovie = yield call(GetCommentMovie1, payload.apiFilmId)
  yield put({ type: "SetCommentMovie", payload: commentMovie })
}

function* mySaga() {
  yield takeEvery("GetMovieNow", getMovieNow)
  yield takeEvery("GetMovieSoon", getMovieSoon)
  yield takeEvery("getFilms", getFilmNow)
  yield takeEvery("getCins", getCins)
  yield takeEvery("getLsBranch", getBranch)
  yield takeEvery("getSchedule", getSchedule)
  yield takeEvery("getSchedule1", getSchedule1)
  yield takeEvery("GetDetailMovie", getDetailMovie)
  yield takeEvery("GetMovieShedule", getMovieShedule)
  yield takeEvery("GetCinBranch", getCinBranch)
  yield takeEvery("GetCommentMovie", getsCommentMovie)
}

export default mySaga;