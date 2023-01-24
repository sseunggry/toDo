import React from 'react';
import {createGlobalStyle} from 'styled-components';
import ToDoList from "./components/ToDoList";
import {Helmet} from "react-helmet";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap');

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol, ul {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  
  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border-style: none;
  }

  //add
  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
  
  button {
    padding: 0;
    background: none;
    border-style: none;
    cursor: pointer;
  }
`;

function App() {
    return (
        <>
            <Helmet>
                <title>toDo</title>
            </Helmet>
            <GlobalStyle/>
            <ToDoList />
        </>
    );
}

export default App;
