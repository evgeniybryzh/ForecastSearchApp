"use strict";
import { useBurgerMenu } from "./scripts/burger";
import { slowVideo } from "./scripts/video";
import { changeBG } from "./scripts/bg";
import { getResponse } from "./scripts/api";
import { useMap } from "./scripts/map";

slowVideo();
useBurgerMenu();
changeBG();
getResponse();
// useMap();
