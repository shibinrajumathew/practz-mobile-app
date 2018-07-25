import React, { Component } from 'react';

const URL=
{
  HOME:'https://demo.practz.com',
  // API'S
  AUTHENTICATION:'/practz/ilearn/v1/authorization',
  USER:'/practz/v1/users/',
  ATTENDED_EXAM_PROGRESS:'/practz/ilearn/v1/dashboards/attended-exams/?',
  AVAILABLE_EXAM:'/practz/ilearn/v1/questions/active-exams/?',
  START_EXAM:'/practz/ilearn/v1/questions/startQuiz/',
  EXAM_DETAILS:'/practz/ilearn/v1/questionpapers/schedule/data?',
  AVAILABLE_NOTES:'/practz/ilearn/v1/notes/all-for-user?',
// /practz/ilearn/v1/questionpapers/schedule/data?
// author hari
NOTE_DETAILS:'/practz/ilearn/v1/notes/'
};
export default URL
