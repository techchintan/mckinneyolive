'use client'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    color: ${(props: any) => props.theme.colors.secondary};
    font-family: "Archivo", sans-serif;
    -webkit-font-smoothing: antialiased;
    line-height: 1.5;
    margin: 0;
  }

  html,
  body {
    scroll-behavior: smooth;
  }

  a {
    color: ${(props: any) => props.theme.colors.primary};
    text-decoration: none;
  }

  img {
    display: block;
    max-width: 100%;
  }

  /* Slick */
  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }

  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }

  .slick-slider {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
    -webkit-tap-highlight-color: transparent;
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .slick-list:focus {
    outline: 0;
  }

  .slick-list.dragging {
    cursor: pointer;
  }

  .slick-slider .slick-list,
  .slick-slider .slick-track {
    transform: translate3d(0, 0, 0);
  }

  .slick-track {
    top: 0;
    left: 0;
  }

  .slick-track:after,
  .slick-track:before {
    display: table;
    content: "";
  }

  .slick-track:after {
    clear: both;
  }

  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
    outline: none;
    &:hover,
    &:focus,
    &:active {
      outline: none;
    }
  }

  [dir="rtl"] .slick-slide {
    float: right;
  }

  .slick-slide img {
    display: block;
  }

  .slick-slide.slick-loading img {
    display: none;
  }

  .slick-slide.dragging img {
    pointer-events: none;
  }

  .slick-initialized .slick-slide {
    display: block;
  }

  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }

  .slick-arrow.slick-hidden {
    display: none;
  }

  .locationSearch {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAjxJREFUeNqslU1IVUEUx+/Tp+kmKRJsYSDRMsgs8isRjCAieJGIERSUIe0i3ZRYBLYpghIFaxNp9IWQBRVBUAtpVeqmVCiqRW0yo6zEJ2i/gXPhMM28e728Az8e58zc959zZuZMYsvZB4HDkrAHUlAFZRL7Ce/hOQzDx/HzqSDKEg6RJrgAOyK+NYL9Zi5CfzNNzLP8TngWQ8BYCZwxWVWeGymPK9IBlyBfxWbgPnTLAq7AG+s/auAxQut8Ikn5bYCL1thVEf3iWNg+Gdsksc0wAM2+TArgspVVO5x0CBhbgofQCBMqfoBs9vpEdsE2FTMluR5jT75CK/xSsVM+EZ3iN+gJ4ts0XFN+HdlUuER0FuZkfQ9WZvekhMZWyb36T6RM+WPByu2DnMLQKnwbH9qfLETSMK/8IpfIb+Wvz0JkNaxR/g+XyGflN2QhUiVCoU26RF4of6dr4yLshHU6x1wid2FRfLM/va66euww6As4TLN0lusd3FKxWrgNayMEWqWV6APQl6lBnoZPKr4fXsFR64gXS4e+CXfED1QVurmMhZneE3Mpn0CpNWdWFpCWsY0RGZrH7BBlS7ta/WvYDePWR6ZsW6E6hkAgbWqIjAp8j9aEHOMuq3y2LcAjmdvvGG+BwVAo4Xnjw0tWB9thAxRKX3sLozAVllya5HHHf5h9O5LMsFrTwp8KXqP2y6y4XapyzBo+CMt5QQ7MCEkmNxzD9TkRUUJtltCcKVfORERoSYQG5UFLEXv5T4ABABWZh1NIqDFPAAAAAElFTkSuQmCC");
    width: 100% !important;
    height: 65px !important;
    margin-top: 2px;
    position: relative !important;
    z-index: 1;
    left: 0px !important;
    top: 0 !important;
    border: 3px solid #F0F0F0 !important;
    font-size: 1.25rem !important;
    padding: 10px 40px !important;
    background-repeat: no-repeat;
    background-position: 12px 19px !important;
    background-size: 19px !important;
  }

  .gmapDiv {
    position: initial !important;
    overflow: visible !important;
    height: 450px;
  }

  .mapRow {
    margin-bottom: 30px;
  }

  #pac-input {
    width: 100%;
    height: 26px;
    font-size: 12px;
    padding: 3px 6px 3px 8px;
    border: 1px solid #B8D2E7;
    box-sizing: border-box;
    outline: none;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
  }

  @media (max-width: 767px) {
    #map {
      height: 600px;
      width: 100% !important;
    }
  }

  @media (max-width: 1280px) {
    iframe.home_page_video {
      height: 100% !important;
      margin: 20px 0;
      width: 100% !important;
      min-height: 300px;
    }
  }

  .react-player-wrapper {
    position: relative;
    padding-top: 56.25%;
  }

  .react-player-video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`
