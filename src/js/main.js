"use strict";
import { useBurgerMenu } from "./scripts/burger";
import { slowVideo } from "./scripts/video";
import { changeBG } from "./scripts/bg";
import { getResponse } from "./scripts/api";

slowVideo();
useBurgerMenu();
changeBG();
getResponse();

import Glide from "@glidejs/glide";
const config = {
  type: "carousel",
};
new Glide(".glide", config).mount();
