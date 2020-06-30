"use strict";
import {
    useBurgerMenu
} from "./scripts/burger";
import {
    changeBG
} from "./scripts/bg";
import {
    getResponse
} from "./scripts/api";
import {
    changeBGForMobile
} from "./scripts/mobile-bg";
import {
    useAutocomplete
} from "./scripts/autocomplete";
import {
    usePreloader
} from "./scripts/preloader";
usePreloader();
changeBGForMobile();
useBurgerMenu();
changeBG();
useAutocomplete();
getResponse();