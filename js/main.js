!function(){"use strict";document.getElementById("video").playbackRate=.4,function(){const e=document.getElementById("burger"),t=e.children,n=document.getElementById("burger-menu"),d=document.getElementById("first-stripe"),i=document.getElementById("second-stripe"),o=document.getElementById("third-stripe"),s=document.getElementById("menu-list");let m=-40,c=40,r=90;function a(){n.style.display="none"}function u(){m=-40,c=40,n.style.top=m+"px",n.style.right=c+"px"}function l(){if(-40==r)return r=90;n.style.top=(r-=5)+"px",setTimeout(l,1)}function g(){l(),setTimeout(a,50),setTimeout(u,500)}function y(){if(n.style.display="flex",360==c)return!0;m<90&&40==c&&(n.style.top=(m+=10)+"px"),90==m&&c<360&&(n.style.right=(c+=10)+"px"),setTimeout(y,5)}function p(){d.classList.remove("pushed"),i.classList.remove("pushed"),o.classList.remove("pushed")}document.addEventListener("click",n=>{n.target!==e&&n.target!==t[0]&&n.target!==t[1]&&n.target!==t[2]||("pushed"==d.classList[1]?(p(),g()):(d.classList.add("pushed"),i.classList.add("pushed"),o.classList.add("pushed"),y())),n.target!==s.children[0]&&n.target!==s.children[1]&&n.target!==s.children[2]&&n.target!==s.children[3]||(g(),p())})}(),function(){const e=document.getElementById("sunny"),t=document.getElementById("rainy"),n=document.getElementById("foggy"),d=document.getElementById("thunder"),i=(document.getElementById("video-source"),document.getElementById("video"));document.addEventListener("click",o=>{o.target==e&&(i.src="images/sunny.mp4"),o.target==t&&(i.src="images/rainy.mp4"),o.target==n&&(i.src="images/foggy.mp4"),o.target==d&&(i.src="images/thunder.mp4")})}(),function(){const e="d6e7fd6926ec77363ffce0e10bfe83b3",t=(document.getElementById("cards"),document.getElementById("cards-info"),document.getElementById("info-details"),document.getElementById("info-title"),document.getElementById("input")),n=(document.getElementsByClassName("info__daily-info"),document.getElementById("button")),d=document.getElementById("search-icon"),i=t=>{var n;t&&fetch((n=t,`http://api.openweathermap.org/data/2.5/weather?q=${n}&units=celsius&appid=${e}`)).then(e=>e.json()).then(e=>{(e=>{const t=document.getElementById("city-name"),n=e.name,d=e.sys.country,i=document.getElementById("temperature"),o=Math.round(e.main.temp-273.15),s=document.getElementById("humidity-info"),m=e.main.humidity,c=document.getElementById("pressure-info"),r=e.main.pressure,a=(e.weather[0].main,document.getElementById("wind-dir-info")),u=e.wind.deg,l=document.getElementById("wind-speed-info"),g=e.wind.speed,y=document.getElementById("weather-icon-big"),p=`https://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`;t.innerText=`${n}, ${d}`,null==d&&(t.innerText=""+n),i.innerHTML=o+" &deg;",y.setAttribute("src",p),s.innerText=`Humidity:  ${m}%`,c.innerText=`Pressure: ${r} hPa`,a.innerText=`Wind Direction: ${u} deg`,l.innerText=`Wind Speed: ${g} mps`})(e)}).catch(e=>{console.log(e);document.getElementById("city-name").innerText=`"${t}" - is wrong City name!`})},o=t=>{var n;t&&fetch((n=t,`http://api.openweathermap.org/data/2.5/forecast?q=${n}&units=celsius&appid=${e}`)).then(e=>e.json()).then(e=>{console.log(e)}).catch(e=>{console.log(e);document.getElementById("city-name").innerText=`"${t}" - is wrong City name!`})};document.addEventListener("click",e=>{e.target!=n&&e.target!=d||(i(t.value.toLowerCase()),o(t.value.toLowerCase()))}),document.addEventListener("keypress",e=>{e.target==t&&"Enter"==e.code&&(i(t.value.toLowerCase()),o(t.value.toLowerCase()))})}()}();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsic3JjL2pzL3NjcmlwdHMvdmlkZW8uanMiLCJzcmMvanMvc2NyaXB0cy9idXJnZXIuanMiLCJzcmMvanMvbWFpbi5qcyIsInNyYy9qcy9zY3JpcHRzL2JnLmpzIiwic3JjL2pzL3NjcmlwdHMvYXBpLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNsb3dWaWRlbygpIHtcclxuICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvXCIpO1xyXG4gIHBsYXllci5wbGF5YmFja1JhdGUgPSAwLjQ7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydCBmdW5jdGlvbiB1c2VCdXJnZXJNZW51KCkge1xyXG4gIGNvbnN0ICRidXJnZXJCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1cmdlclwiKTtcclxuICBjb25zdCAkYnVyZ2VyU3RyaXBlcyA9ICRidXJnZXJCdG4uY2hpbGRyZW47XHJcbiAgY29uc3QgJGJ1cmdlck1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1cmdlci1tZW51XCIpO1xyXG4gIGNvbnN0ICRmaXJzdFN0cmlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlyc3Qtc3RyaXBlXCIpO1xyXG4gIGNvbnN0ICRzZWNvbmRTdHJpcGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlY29uZC1zdHJpcGVcIik7XHJcbiAgY29uc3QgJHRoaXJkU3RyaXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGlyZC1zdHJpcGVcIik7XHJcbiAgY29uc3QgJGJ1cmdlck1lbnVMaXN0SXRlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1lbnUtbGlzdFwiKTtcclxuICBsZXQgdG9wQ291bnRlciA9IC00MDtcclxuICBsZXQgcmlnaHRDb3VudGVyID0gNDA7XHJcbiAgbGV0IGNvdW50ID0gOTA7XHJcblxyXG4gIGZ1bmN0aW9uIGNoYW5nZVZpc2liaWxpdHlUb2hpZGRlbigpIHtcclxuICAgICRidXJnZXJNZW51LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICB9XHJcbiAgZnVuY3Rpb24gY2hhbmdlVmlzaWJpbGl0eVRvVmlzaWJsZSgpIHtcclxuICAgICRidXJnZXJNZW51LnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxuICB9XHJcbiAgZnVuY3Rpb24gcmV0dXJuRGlyZWN0aW9uKCkge1xyXG4gICAgdG9wQ291bnRlciA9IC00MDtcclxuICAgIHJpZ2h0Q291bnRlciA9IDQwO1xyXG4gICAgJGJ1cmdlck1lbnUuc3R5bGUudG9wID0gYCR7dG9wQ291bnRlcn1weGA7XHJcbiAgICAkYnVyZ2VyTWVudS5zdHlsZS5yaWdodCA9IGAke3JpZ2h0Q291bnRlcn1weGA7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBtb3ZlVG9wKCkge1xyXG4gICAgaWYgKGNvdW50ID09IC00MCkge1xyXG4gICAgICByZXR1cm4gKGNvdW50ID0gOTApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJGJ1cmdlck1lbnUuc3R5bGUudG9wID0gYCR7KGNvdW50IC09IDUpfXB4YDtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQobW92ZVRvcCwgMSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlTWVudUJhY2soKSB7XHJcbiAgICBtb3ZlVG9wKCk7XHJcbiAgICBzZXRUaW1lb3V0KGNoYW5nZVZpc2liaWxpdHlUb2hpZGRlbiwgNTApO1xyXG4gICAgc2V0VGltZW91dChyZXR1cm5EaXJlY3Rpb24sIDUwMCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhbmltYXRlTWVudUZvcndhcmQoKSB7XHJcbiAgICBjaGFuZ2VWaXNpYmlsaXR5VG9WaXNpYmxlKCk7XHJcbiAgICBpZiAocmlnaHRDb3VudGVyID09IDM2MCkgcmV0dXJuIHRydWU7XHJcbiAgICBpZiAodG9wQ291bnRlciA8IDkwICYmIHJpZ2h0Q291bnRlciA9PSA0MCkge1xyXG4gICAgICAkYnVyZ2VyTWVudS5zdHlsZS50b3AgPSBgJHsodG9wQ291bnRlciArPSAxMCl9cHhgO1xyXG4gICAgfVxyXG4gICAgaWYgKHRvcENvdW50ZXIgPT0gOTAgJiYgcmlnaHRDb3VudGVyIDwgMzYwKSB7XHJcbiAgICAgICRidXJnZXJNZW51LnN0eWxlLnJpZ2h0ID0gYCR7KHJpZ2h0Q291bnRlciArPSAxMCl9cHhgO1xyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dChhbmltYXRlTWVudUZvcndhcmQsIDUpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlU3RyaXBlc0NoYW5nZXMoKSB7XHJcbiAgICAkZmlyc3RTdHJpcGUuY2xhc3NMaXN0LnJlbW92ZShcInB1c2hlZFwiKTtcclxuICAgICRzZWNvbmRTdHJpcGUuY2xhc3NMaXN0LnJlbW92ZShcInB1c2hlZFwiKTtcclxuICAgICR0aGlyZFN0cmlwZS5jbGFzc0xpc3QucmVtb3ZlKFwicHVzaGVkXCIpO1xyXG4gIH1cclxuICBmdW5jdGlvbiBhZGRTdHJpcGVDaGFuZ2VzKCkge1xyXG4gICAgJGZpcnN0U3RyaXBlLmNsYXNzTGlzdC5hZGQoXCJwdXNoZWRcIik7XHJcbiAgICAkc2Vjb25kU3RyaXBlLmNsYXNzTGlzdC5hZGQoXCJwdXNoZWRcIik7XHJcbiAgICAkdGhpcmRTdHJpcGUuY2xhc3NMaXN0LmFkZChcInB1c2hlZFwiKTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHVzZUJ1cmdlciA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlckJ0biB8fFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlclN0cmlwZXNbMF0gfHxcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJTdHJpcGVzWzFdIHx8XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSAkYnVyZ2VyU3RyaXBlc1syXVxyXG4gICAgICApIHtcclxuICAgICAgICBpZiAoJGZpcnN0U3RyaXBlLmNsYXNzTGlzdFsxXSA9PSBcInB1c2hlZFwiKSB7XHJcbiAgICAgICAgICByZW1vdmVTdHJpcGVzQ2hhbmdlcygpO1xyXG4gICAgICAgICAgYW5pbWF0ZU1lbnVCYWNrKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGFkZFN0cmlwZUNoYW5nZXMoKTtcclxuICAgICAgICAgIGFuaW1hdGVNZW51Rm9yd2FyZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlck1lbnVMaXN0SXRlbXMuY2hpbGRyZW5bMF0gfHxcclxuICAgICAgICBldmVudC50YXJnZXQgPT09ICRidXJnZXJNZW51TGlzdEl0ZW1zLmNoaWxkcmVuWzFdIHx8XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ID09PSAkYnVyZ2VyTWVudUxpc3RJdGVtcy5jaGlsZHJlblsyXSB8fFxyXG4gICAgICAgIGV2ZW50LnRhcmdldCA9PT0gJGJ1cmdlck1lbnVMaXN0SXRlbXMuY2hpbGRyZW5bM11cclxuICAgICAgKSB7XHJcbiAgICAgICAgYW5pbWF0ZU1lbnVCYWNrKCk7XHJcbiAgICAgICAgcmVtb3ZlU3RyaXBlc0NoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuICB1c2VCdXJnZXIoKTtcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuaW1wb3J0IHsgdXNlQnVyZ2VyTWVudSB9IGZyb20gXCIuL3NjcmlwdHMvYnVyZ2VyXCI7XHJcbmltcG9ydCB7IHNsb3dWaWRlbyB9IGZyb20gXCIuL3NjcmlwdHMvdmlkZW9cIjtcclxuaW1wb3J0IHsgY2hhbmdlQkcgfSBmcm9tIFwiLi9zY3JpcHRzL2JnXCI7XHJcbmltcG9ydCB7IGdldFJlc3BvbnNlIH0gZnJvbSBcIi4vc2NyaXB0cy9hcGlcIjtcclxuc2xvd1ZpZGVvKCk7XHJcbnVzZUJ1cmdlck1lbnUoKTtcclxuY2hhbmdlQkcoKTtcclxuZ2V0UmVzcG9uc2UoKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VCRygpIHtcclxuICBjb25zdCAkYnV0dG9uU3VubnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1bm55XCIpO1xyXG4gIGNvbnN0ICRidXR0b25SYWlueSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmFpbnlcIik7XHJcbiAgY29uc3QgJGJ1dHRvbkZvZ2d5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb2dneVwiKTtcclxuICBjb25zdCAkYnV0dG9uVGh1bmRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGh1bmRlclwiKTtcclxuICBjb25zdCAkdmlkZW9Tb3VyY2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvLXNvdXJjZVwiKTtcclxuICBjb25zdCAkdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpZGVvXCIpO1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gJGJ1dHRvblN1bm55KSB7XHJcbiAgICAgICR2aWRlby5zcmMgPSBcImltYWdlcy9zdW5ueS5tcDRcIjtcclxuICAgIH1cclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gJGJ1dHRvblJhaW55KSB7XHJcbiAgICAgICR2aWRlby5zcmMgPSBcImltYWdlcy9yYWlueS5tcDRcIjtcclxuICAgIH1cclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gJGJ1dHRvbkZvZ2d5KSB7XHJcbiAgICAgICR2aWRlby5zcmMgPSBcImltYWdlcy9mb2dneS5tcDRcIjtcclxuICAgIH1cclxuICAgIGlmIChldmVudC50YXJnZXQgPT0gJGJ1dHRvblRodW5kZXIpIHtcclxuICAgICAgJHZpZGVvLnNyYyA9IFwiaW1hZ2VzL3RodW5kZXIubXA0XCI7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVzcG9uc2UoKSB7XHJcbiAgY29uc3QgQVBJX0tFWSA9IFwiZDZlN2ZkNjkyNmVjNzczNjNmZmNlMGUxMGJmZTgzYjNcIjtcclxuICBjb25zdCBCQVNFX1VSTCA9IGBodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9YDtcclxuICBjb25zdCBTRUNPTkRBUllfVVJMID0gYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L2ZvcmVjYXN0P3E9YDtcclxuXHJcbiAgY29uc3QgJGNhcmRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkc1wiKTtcclxuICBjb25zdCAkY2FyZHNJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYXJkcy1pbmZvXCIpO1xyXG4gIGNvbnN0ICRpbmZvRGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5mby1kZXRhaWxzXCIpO1xyXG4gIGNvbnN0ICRpbmZvVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluZm8tdGl0bGVcIik7XHJcbiAgY29uc3QgJGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dFwiKTtcclxuICBjb25zdCBkYWlseUluZm9JdGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJpbmZvX19kYWlseS1pbmZvXCIpO1xyXG4gIGNvbnN0ICRzZWFyY2hCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRvblwiKTtcclxuICBjb25zdCAkc2VhcmNoSWNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoLWljb25cIik7XHJcblxyXG4gIGNvbnN0IGdldFNlYXJjaFVybCA9IChjaXR5KSA9PiB7XHJcbiAgICByZXR1cm4gYCR7QkFTRV9VUkx9JHtjaXR5fSZ1bml0cz1jZWxzaXVzJmFwcGlkPSR7QVBJX0tFWX1gO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldFNlYXJjaFVybEZvckRheXMgPSAoY2l0eSkgPT4ge1xyXG4gICAgcmV0dXJuIGAke1NFQ09OREFSWV9VUkx9JHtjaXR5fSZ1bml0cz1jZWxzaXVzJmFwcGlkPSR7QVBJX0tFWX1gO1xyXG4gIH07XHJcbiAgY29uc3Qgc2hvd1dlYXRoZXJJbmZvID0gKGRhdGEpID0+IHtcclxuICAgIGNvbnN0ICRjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1uYW1lXCIpO1xyXG4gICAgY29uc3QgY2l0eU5hbWUgPSBkYXRhLm5hbWU7XHJcbiAgICBjb25zdCBjaXR5Q291bnRyeSA9IGRhdGEuc3lzLmNvdW50cnk7XHJcbiAgICBjb25zdCAkdGVtcGVyYXR1cmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRlbXBlcmF0dXJlXCIpO1xyXG4gICAgY29uc3QgY3VycmVudFRlbXAgPSBNYXRoLnJvdW5kKGRhdGEubWFpbi50ZW1wIC0gMjczLjE1KTtcclxuICAgIGNvbnN0ICRodW1pZGl0eUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImh1bWlkaXR5LWluZm9cIik7XHJcbiAgICBjb25zdCBodW1pZGl0eSA9IGRhdGEubWFpbi5odW1pZGl0eTtcclxuICAgIGNvbnN0ICRwcmVzc3VyZUluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByZXNzdXJlLWluZm9cIik7XHJcbiAgICBjb25zdCBwcmVzc3VyZSA9IGRhdGEubWFpbi5wcmVzc3VyZTtcclxuICAgIGNvbnN0IGN1cnJlbnRXZWF0aGVyID0gZGF0YS53ZWF0aGVyWzBdLm1haW47XHJcbiAgICBjb25zdCAkd2luZERpckluZm8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndpbmQtZGlyLWluZm9cIik7XHJcbiAgICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZGF0YS53aW5kLmRlZztcclxuICAgIGNvbnN0ICR3aW5kU3BlZWRJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3aW5kLXNwZWVkLWluZm9cIik7XHJcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBkYXRhLndpbmQuc3BlZWQ7XHJcbiAgICBjb25zdCAkd2VhdGhlckljb25CaWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYXRoZXItaWNvbi1iaWdcIik7XHJcbiAgICBjb25zdCBpY29uID0gYGh0dHBzOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi8ke2RhdGEud2VhdGhlclswXS5pY29ufUAyeC5wbmdgO1xyXG4gICAgJGNpdHlOYW1lLmlubmVyVGV4dCA9IGAke2NpdHlOYW1lfSwgJHtjaXR5Q291bnRyeX1gO1xyXG4gICAgaWYgKGNpdHlDb3VudHJ5ID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAkY2l0eU5hbWUuaW5uZXJUZXh0ID0gYCR7Y2l0eU5hbWV9YDtcclxuICAgIH1cclxuICAgICR0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBgJHtjdXJyZW50VGVtcH0gJmRlZztgO1xyXG4gICAgJHdlYXRoZXJJY29uQmlnLnNldEF0dHJpYnV0ZShcInNyY1wiLCBpY29uKTtcclxuICAgICRodW1pZGl0eUluZm8uaW5uZXJUZXh0ID0gYEh1bWlkaXR5OiAgJHtodW1pZGl0eX0lYDtcclxuICAgICRwcmVzc3VyZUluZm8uaW5uZXJUZXh0ID0gYFByZXNzdXJlOiAke3ByZXNzdXJlfSBoUGFgO1xyXG4gICAgJHdpbmREaXJJbmZvLmlubmVyVGV4dCA9IGBXaW5kIERpcmVjdGlvbjogJHt3aW5kRGlyZWN0aW9ufSBkZWdgO1xyXG4gICAgJHdpbmRTcGVlZEluZm8uaW5uZXJUZXh0ID0gYFdpbmQgU3BlZWQ6ICR7d2luZFNwZWVkfSBtcHNgO1xyXG4gIH07XHJcblxyXG4gIGNvbnN0IGdldFJlc3BvbnNlID0gKHF1ZXJ5KSA9PiB7XHJcbiAgICBpZiAocXVlcnkpIHtcclxuICAgICAgZmV0Y2goZ2V0U2VhcmNoVXJsKHF1ZXJ5KSlcclxuICAgICAgICAudGhlbigocmVzKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICBzaG93V2VhdGhlckluZm8oZGF0YSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcclxuICAgICAgICAgIGNvbnN0ICRjaXR5TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2l0eS1uYW1lXCIpO1xyXG4gICAgICAgICAgJGNpdHlOYW1lLmlubmVyVGV4dCA9IGBcIiR7cXVlcnl9XCIgLSBpcyB3cm9uZyBDaXR5IG5hbWUhYDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNvbnN0IGdldFJlc3BvbnNlRm9yRGF5cyA9IChxdWVyeSkgPT4ge1xyXG4gICAgaWYgKHF1ZXJ5KSB7XHJcbiAgICAgIGZldGNoKGdldFNlYXJjaFVybEZvckRheXMocXVlcnkpKVxyXG4gICAgICAgIC50aGVuKChyZXMpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XHJcbiAgICAgICAgICBjb25zdCAkY2l0eU5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNpdHktbmFtZVwiKTtcclxuICAgICAgICAgICRjaXR5TmFtZS5pbm5lclRleHQgPSBgXCIke3F1ZXJ5fVwiIC0gaXMgd3JvbmcgQ2l0eSBuYW1lIWA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkc2VhcmNoQnV0dG9uIHx8IGV2ZW50LnRhcmdldCA9PSAkc2VhcmNoSWNvbikge1xyXG4gICAgICBnZXRSZXNwb25zZSgkaW5wdXQudmFsdWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgIGdldFJlc3BvbnNlRm9yRGF5cygkaW5wdXQudmFsdWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCA9PSAkaW5wdXQgJiYgZXZlbnQuY29kZSA9PSBcIkVudGVyXCIpIHtcclxuICAgICAgZ2V0UmVzcG9uc2UoJGlucHV0LnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgICBnZXRSZXNwb25zZUZvckRheXMoJGlucHV0LnZhbHVlLnRvTG93ZXJDYXNlKCkpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicGxheWJhY2tSYXRlIiwiJGJ1cmdlckJ0biIsIiRidXJnZXJTdHJpcGVzIiwiY2hpbGRyZW4iLCIkYnVyZ2VyTWVudSIsIiRmaXJzdFN0cmlwZSIsIiRzZWNvbmRTdHJpcGUiLCIkdGhpcmRTdHJpcGUiLCIkYnVyZ2VyTWVudUxpc3RJdGVtcyIsInRvcENvdW50ZXIiLCJyaWdodENvdW50ZXIiLCJjb3VudCIsImNoYW5nZVZpc2liaWxpdHlUb2hpZGRlbiIsInN0eWxlIiwiZGlzcGxheSIsInJldHVybkRpcmVjdGlvbiIsInRvcCIsInJpZ2h0IiwibW92ZVRvcCIsInNldFRpbWVvdXQiLCJhbmltYXRlTWVudUJhY2siLCJhbmltYXRlTWVudUZvcndhcmQiLCJyZW1vdmVTdHJpcGVzQ2hhbmdlcyIsImNsYXNzTGlzdCIsInJlbW92ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInRhcmdldCIsImFkZCIsInVzZUJ1cmdlck1lbnUiLCIkYnV0dG9uU3VubnkiLCIkYnV0dG9uUmFpbnkiLCIkYnV0dG9uRm9nZ3kiLCIkYnV0dG9uVGh1bmRlciIsIiR2aWRlbyIsInNyYyIsImNoYW5nZUJHIiwiQVBJX0tFWSIsIiRpbnB1dCIsIiRzZWFyY2hCdXR0b24iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiJHNlYXJjaEljb24iLCJnZXRSZXNwb25zZSIsInF1ZXJ5IiwiY2l0eSIsImZldGNoIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwiJGNpdHlOYW1lIiwiY2l0eU5hbWUiLCJuYW1lIiwiY2l0eUNvdW50cnkiLCJzeXMiLCJjb3VudHJ5IiwiJHRlbXBlcmF0dXJlIiwiY3VycmVudFRlbXAiLCJNYXRoIiwicm91bmQiLCJtYWluIiwidGVtcCIsIiRodW1pZGl0eUluZm8iLCJodW1pZGl0eSIsIiRwcmVzc3VyZUluZm8iLCJwcmVzc3VyZSIsIiR3aW5kRGlySW5mbyIsIndlYXRoZXIiLCJ3aW5kRGlyZWN0aW9uIiwid2luZCIsImRlZyIsIiR3aW5kU3BlZWRJbmZvIiwid2luZFNwZWVkIiwic3BlZWQiLCIkd2VhdGhlckljb25CaWciLCJpY29uIiwiaW5uZXJUZXh0IiwidW5kZWZpbmVkIiwiaW5uZXJIVE1MIiwic2V0QXR0cmlidXRlIiwic2hvd1dlYXRoZXJJbmZvIiwiY2F0Y2giLCJlcnIiLCJjb25zb2xlIiwibG9nIiwiZ2V0UmVzcG9uc2VGb3JEYXlzIiwidmFsdWUiLCJ0b0xvd2VyQ2FzZSIsImNvZGUiXSwibWFwcGluZ3MiOiJ5QkFHaUJBLFNBQVNDLGVBQWUsU0FDaENDLGFBQWUsR0NIakIsaUJBQ0NDLEVBQWFILFNBQVNDLGVBQWUsVUFDckNHLEVBQWlCRCxFQUFXRSxTQUM1QkMsRUFBY04sU0FBU0MsZUFBZSxlQUN0Q00sRUFBZVAsU0FBU0MsZUFBZSxnQkFDdkNPLEVBQWdCUixTQUFTQyxlQUFlLGlCQUN4Q1Es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
