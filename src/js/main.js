"use strict";
import { useBurgerMenu } from "./scripts/burger";
import { slowVideo } from "./scripts/video";
import { changeBG } from "./scripts/bg";
import { getResponse } from "./scripts/api";
slowVideo();
useBurgerMenu();
changeBG();
getResponse();
