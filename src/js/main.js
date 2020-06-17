"use strict";

import { useBurgerMenu } from "./scripts/burger";
import { changeBG } from "./scripts/bg";
import { getResponse } from "./scripts/api";
import { useMap } from "./scripts/map";
import { changeBGForMobile } from "./scripts/mobile-bg";
import { useAutocomplete } from "./scripts/autocomplete";
import { usePreloader } from "./scripts/preloader";

changeBGForMobile();
useBurgerMenu();
changeBG();
getResponse();
useAutocomplete();
usePreloader();
