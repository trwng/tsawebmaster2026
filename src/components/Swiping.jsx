import { useRef, useState, useCallback, useLayoutEffect, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { pageNavigation } from "../store";
import ExpandedCard from "./Globe/ExpandedCard";
import useScrollReveal from "./UseScrollReveal";

gsap.registerPlugin(Draggable);

const API_URL = "https://volunteer-api-x37c.onrender.com/api/opportunities";
const SWIPE_THRESHOLD = 100;
const TINT_THRESHOLD = 60;

const Web = () => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 512 512" 
      className="w-4 h-4 shrink-0"
    >
      <path 
        d="M0 0 C2.70251087 2.48897417 5.36300897 5.01955942 8.00952148 7.56787109 C8.53320312 8.06963867 9.05688477 8.57140625 9.59643555 9.08837891 C26.12021104 24.998268 39.77859316 43.59315833 51.00952148 63.56787109 C51.3749707 64.20450684 51.74041992 64.84114258 52.11694336 65.49707031 C83.77808666 120.93150709 89.81246636 188.9886323 73.29077148 250.12255859 C61.83645274 290.23370785 40.8502302 325.61576705 12.00952148 355.56787109 C11.50775391 356.09155273 11.00598633 356.61523438 10.48901367 357.15478516 C-4.91348237 373.15158973 -22.87841753 386.6335743 -42.20776367 397.55908203 C-43.93956316 398.5390595 -45.65862639 399.54143836 -47.37719727 400.54443359 C-102.12107081 431.74130371 -170.35137865 437.11325277 -230.54125977 420.84912109 C-270.65385491 409.40039298 -306.03894107 388.40803423 -335.99047852 359.56787109 C-336.51416016 359.06610352 -337.0378418 358.56433594 -337.57739258 358.04736328 C-353.57419715 342.64486723 -367.05618172 324.67993208 -377.98168945 305.35058594 C-378.96166692 303.61878645 -379.96404579 301.89972322 -380.96704102 300.18115234 C-412.19815318 245.39463419 -417.54892464 177.24241039 -401.27172852 117.01318359 C-389.81740977 76.90203433 -368.83118723 41.51997514 -339.99047852 11.56787109 C-339.48871094 11.04418945 -338.98694336 10.52050781 -338.4699707 9.98095703 C-323.06747466 -6.01584754 -305.1025395 -19.49783211 -285.77319336 -30.42333984 C-284.04139387 -31.40331731 -282.32233064 -32.40569618 -280.60375977 -33.40869141 C-195.62315732 -81.85197301 -85.4569275 -68.25292875 0 0 Z M-214.58520508 -16.79785156 C-215.8803342 -15.53917326 -217.21132988 -14.31768202 -218.54516602 -13.10009766 C-234.44133547 1.80573536 -245.66736438 22.60310213 -253.99047852 42.56787109 C-253.99047852 43.22787109 -253.99047852 43.88787109 -253.99047852 44.56787109 C-227.92047852 44.56787109 -201.85047852 44.56787109 -174.99047852 44.56787109 C-174.99047852 17.17787109 -174.99047852 -10.21212891 -174.99047852 -38.43212891 C-190.11844247 -38.43212891 -204.30102311 -26.89311235 -214.58520508 -16.79785156 Z M-152.99047852 -38.43212891 C-152.99047852 -11.04212891 -152.99047852 16.34787109 -152.99047852 44.56787109 C-126.92047852 44.56787109 -100.85047852 44.56787109 -73.99047852 44.56787109 C-76.29327949 37.65946818 -78.59127427 31.90001226 -81.92797852 25.56787109 C-82.64606689 24.20408325 -82.64606689 24.20408325 -83.37866211 22.81274414 C-90.33914718 9.89467046 -98.75852048 -1.89923093 -108.99047852 -12.43212891 C-109.81805664 -13.33318359 -110.64563477 -14.23423828 -111.49829102 -15.16259766 C-122.76099959 -27.06560599 -136.54616131 -36.08294073 -152.99047852 -38.43212891 Z M-90.99047852 -27.43212891 C-87.21548158 -22.30623574 -87.21548158 -22.30623574 -83.23266602 -17.34228516 C-68.08070621 0.69425277 -57.22190614 22.61739742 -48.99047852 44.56787109 C-29.52047852 44.56787109 -10.05047852 44.56787109 10.00952148 44.56787109 C7.46796756 40.33194789 4.85388677 36.99005457 1.50952148 33.44287109 C0.97762207 32.8752002 0.44572266 32.3075293 -0.10229492 31.72265625 C-1.72545999 29.9983744 -3.35714638 28.28251848 -4.99047852 26.56787109 C-6.34786133 25.12927734 -6.34786133 25.12927734 -7.73266602 23.66162109 C-14.62895069 16.54023514 -22.07364029 10.4897616 -29.99047852 4.56787109 C-30.55105957 4.14119141 -31.11164063 3.71451172 -31.68920898 3.27490234 C-44.21486158 -6.23362226 -57.84714704 -13.55717094 -71.99047852 -20.36962891 C-72.74288818 -20.73515869 -73.49529785 -21.10068848 -74.27050781 -21.47729492 C-79.70155708 -24.03304768 -85.20578027 -25.84480891 -90.99047852 -27.43212891 Z M-238.99047852 -27.43212891 C-241.82935388 -26.43775527 -244.54422766 -25.36893098 -247.30297852 -24.18212891 C-248.56319824 -23.64338135 -248.56319824 -23.64338135 -249.84887695 -23.09375 C-276.1782827 -11.61047466 -299.29895632 3.68778115 -319.99047852 23.56787109 C-320.51448242 24.06996094 -321.03848633 24.57205078 -321.57836914 25.08935547 C-330.55422334 33.66917537 -330.55422334 33.66917537 -337.99047852 43.56787109 C-337.99047852 43.89787109 -337.99047852 44.22787109 -337.99047852 44.56787109 C-318.52047852 44.56787109 -299.05047852 44.56787109 -278.99047852 44.56787109 C-276.02047852 37.63787109 -273.05047852 30.70787109 -269.99047852 23.56787109 C-268.24603645 19.90736396 -266.51730025 16.32392409 -264.61547852 12.75537109 C-264.15979492 11.89556641 -263.70411133 11.03576172 -263.23461914 10.14990234 C-255.99029441 -3.24563914 -247.06316567 -15.05408384 -236.99047852 -26.43212891 C-237.98047852 -26.92712891 -237.98047852 -26.92712891 -238.99047852 -27.43212891 Z M-357.76000977 70.77880859 C-358.55275071 72.35128599 -359.30208345 73.94699614 -359.99047852 75.56787109 C-360.53687988 76.53668213 -361.08328125 77.50549316 -361.64624023 78.50366211 C-376.23177413 107.90673437 -386.99047852 139.42379162 -386.99047852 172.56787109 C-359.27047852 172.56787109 -331.55047852 172.56787109 -302.99047852 172.56787109 C-302.00047852 160.02787109 -301.01047852 147.48787109 -299.99047852 134.56787109 C-297.82636122 117.03105853 -294.8487944 100.06546235 -290.77679443 82.89874268 C-289.97332976 79.49522817 -289.18408073 76.08869026 -288.39892578 72.6809082 C-288.13370621 71.53021347 -287.86848663 70.37951874 -287.5952301 69.19395447 C-287.39566208 68.32734695 -287.19609406 67.46073944 -286.99047852 66.56787109 C-295.6222012 66.35903655 -304.25305061 66.19928022 -312.88675117 66.10156155 C-316.89619488 66.05465173 -320.90390673 65.99107266 -324.91235352 65.88891602 C-328.78341444 65.79088187 -332.65281392 65.73726674 -336.5250206 65.71397591 C-337.99960367 65.69738733 -339.47409893 65.6649885 -340.94797134 65.61630058 C-350.62744412 65.05799471 -350.62744412 65.05799471 -357.76000977 70.77880859 Z M-262.99047852 66.56787109 C-268.0685745 82.4395501 -268.0685745 82.4395501 -272.11547852 98.50537109 C-272.36136719 99.63523438 -272.60725586 100.76509766 -272.8605957 101.92919922 C-277.73044677 125.01165669 -280.99047852 148.94269687 -280.99047852 172.56787109 C-246.01047852 172.56787109 -211.03047852 172.56787109 -174.99047852 172.56787109 C-174.99047852 137.58787109 -174.99047852 102.60787109 -174.99047852 66.56787109 C-204.03047852 66.56787109 -233.07047852 66.56787109 -262.99047852 66.56787109 Z M-152.99047852 66.56787109 C-152.99047852 101.54787109 -152.99047852 136.52787109 -152.99047852 172.56787109 C-118.01047852 172.56787109 -83.03047852 172.56787109 -46.99047852 172.56787109 C-47.80972991 153.70668267 -47.80972991 153.70668267 -49.67797852 135.00537109 C-49.76251282 134.34242035 -49.84704712 133.6794696 -49.93414307 132.99642944 C-53.96994338 98.82484363 -53.96994338 98.82484363 -64.99047852 66.56787109 C-94.03047852 66.56787109 -123.07047852 66.56787109 -152.99047852 66.56787109 Z M-40.99047852 66.56787109 C-40.7365332 67.6377124 -40.48258789 68.70755371 -40.22094727 69.80981445 C-35.60671327 89.29715572 -31.24258861 108.74695685 -28.74047852 128.63037109 C-28.5896582 129.80865479 -28.43883789 130.98693848 -28.28344727 132.20092773 C-26.68823824 145.63715057 -25.95692665 159.03759725 -24.99047852 172.56787109 C2.72952148 172.56787109 30.44952148 172.56787109 59.00952148 172.56787109 C59.00952148 136.1553746 46.51540626 99.69174639 28.00952148 68.56787109 C26.14984687 66.27911326 26.14984687 66.27911326 23.22543335 66.32736206 C22.03962677 66.33180328 20.85382019 66.33624451 19.63208008 66.34082031 C18.65140816 66.34038223 18.65140816 66.34038223 17.65092468 66.3399353 C15.48646852 66.34133045 13.32235513 66.3568999 11.15795898 66.37255859 C9.6586628 66.37628808 8.15936419 66.37913535 6.6600647 66.38113403 C2.71115405 66.38877561 -1.23760981 66.4084285 -5.1864624 66.43054199 C-9.21486424 66.45098919 -13.24328976 66.46013333 -17.27172852 66.47021484 C-25.17804593 66.49167399 -33.08424397 66.52581615 -40.99047852 66.56787109 Z M-386.99047852 194.56787109 C-386.99047852 225.80988283 -377.31938022 277.23896939 -353.99047852 300.56787109 C-351.07545584 300.86166936 -351.07545584 300.86166936 -347.61303711 300.79492188 C-346.63236519 300.79535995 -346.63236519 300.79535995 -345.63188171 300.79580688 C-343.46742555 300.79441174 -341.30331216 300.77884229 -339.13891602 300.76318359 C-337.63961983 300.75945411 -336.14032122 300.75660683 -334.64102173 300.75460815 C-330.69211108 300.74696658 -326.74334722 300.72731369 -322.79449463 300.7052002 C-318.76609279 300.684753 -314.73766727 300.67560886 -310.70922852 300.66552734 C-302.80291111 300.6440682 -294.89671306 300.60992604 -286.99047852 300.56787109 C-287.24442383 299.49802979 -287.49836914 298.42818848 -287.76000977 297.32592773 C-292.37424376 277.83858646 -296.73836842 258.38878534 -299.24047852 238.50537109 C-299.39129883 237.3270874 -299.54211914 236.14880371 -299.69750977 234.93481445 C-301.29271879 221.49859161 -302.02403038 208.09814494 -302.99047852 194.56787109 C-330.71047852 194.56787109 -358.43047852 194.56787109 -386.99047852 194.56787109 Z M-280.99047852 194.56787109 C-280.17122712 213.42905952 -280.17122712 213.42905952 -278.30297852 232.13037109 C-278.17617706 233.12479721 -278.17617706 233.12479721 -278.04681396 234.13931274 C-274.01101365 268.31089856 -274.01101365 268.31089856 -262.99047852 300.56787109 C-233.95047852 300.56787109 -204.91047852 300.56787109 -174.99047852 300.56787109 C-174.99047852 265.58787109 -174.99047852 230.60787109 -174.99047852 194.56787109 C-209.97047852 194.56787109 -244.95047852 194.56787109 -280.99047852 194.56787109 Z M-152.99047852 194.56787109 C-152.99047852 229.54787109 -152.99047852 264.52787109 -152.99047852 300.56787109 C-123.95047852 300.56787109 -94.91047852 300.56787109 -64.99047852 300.56787109 C-59.91230352 284.69623679 -59.91230352 284.69623679 -55.86547852 268.63037109 C-55.61958984 267.49978271 -55.37370117 266.36919434 -55.12036133 265.2043457 C-50.25383608 242.12651961 -46.99047852 218.18975382 -46.99047852 194.56787109 C-81.97047852 194.56787109 -116.95047852 194.56787109 -152.99047852 194.56787109 Z M-24.99047852 194.56787109 C-25.98047852 207.10787109 -26.97047852 219.64787109 -27.99047852 232.56787109 C-30.15459581 250.10468365 -33.13216263 267.07027984 -37.2041626 284.23699951 C-38.00762727 287.64051402 -38.7968763 291.04705193 -39.58203125 294.45483398 C-39.84725082 295.60552872 -40.1124704 296.75622345 -40.38572693 297.94178772 C-40.58529495 298.80839523 -40.78486298 299.67500275 -40.99047852 300.56787109 C-32.35875583 300.77670564 -23.72790642 300.93646197 -15.09420586 301.03418064 C-11.08476215 301.08109046 -7.0770503 301.14466953 -3.06860352 301.24682617 C0.80245741 301.34486031 4.67185689 301.39847545 8.54406357 301.42176628 C10.01864664 301.43835486 11.49314189 301.47075369 12.96701431 301.5194416 C21.11624905 302.02927562 21.11624905 302.02927562 28.18185425 298.69786072 C29.76161982 296.38248407 30.91544007 294.1439633 32.00952148 291.56787109 C32.55592285 290.59906006 33.10232422 289.63024902 33.6652832 288.63208008 C48.24636481 259.23798322 59.00952148 227.70835418 59.00952148 194.56787109 C31.28952148 194.56787109 3.56952148 194.56787109 -24.99047852 194.56787109 Z M-337.99047852 322.56787109 C-335.43452241 326.82779794 -332.79254916 330.18767869 -329.42797852 333.75537109 C-328.89567627 334.32416992 -328.36337402 334.89296875 -327.81494141 335.47900391 C-326.21380237 337.18210959 -324.604158 338.87664985 -322.99047852 340.56787109 C-322.12422852 341.47666016 -321.25797852 342.38544922 -320.36547852 343.32177734 C-314.60597 349.21973558 -308.53652534 354.56151494 -301.99047852 359.56787109 C-301.34578613 360.0619043 -300.70109375 360.5559375 -300.03686523 361.06494141 C-286.16790276 371.59727574 -271.65289962 379.94623368 -255.99047852 387.50537109 C-254.86138062 388.05402832 -254.86138062 388.05402832 -253.70947266 388.61376953 C-248.27855627 391.16879192 -242.77478872 392.98065758 -236.99047852 394.56787109 C-240.14281614 390.30966226 -243.34674663 386.13759023 -246.74047852 382.06787109 C-254.88252781 371.87488893 -261.16596674 360.51302775 -267.24047852 349.00537109 C-267.96509277 347.64279175 -267.96509277 347.64279175 -268.7043457 346.25268555 C-272.73691521 338.47667155 -275.69135941 330.81566885 -278.99047852 322.56787109 C-298.46047852 322.56787109 -317.93047852 322.56787109 -337.99047852 322.56787109 Z M-253.99047852 322.56787109 C-251.68767754 329.47627401 -249.38968277 335.23572993 -246.05297852 341.56787109 C-245.57425293 342.47706299 -245.09552734 343.38625488 -244.60229492 344.32299805 C-237.64180985 357.24107173 -229.22243655 369.03497312 -218.99047852 379.56787109 C-218.16290039 380.46892578 -217.33532227 381.36998047 -216.48266602 382.29833984 C-205.21995744 394.20134818 -191.43479572 403.21868292 -174.99047852 405.56787109 C-174.99047852 378.17787109 -174.99047852 350.78787109 -174.99047852 322.56787109 C-201.06047852 322.56787109 -227.13047852 322.56787109 -253.99047852 322.56787109 Z M-152.99047852 322.56787109 C-152.99047852 349.95787109 -152.99047852 377.34787109 -152.99047852 405.56787109 C-136.88484177 403.26706584 -124.51860352 394.63853082 -112.99047852 383.56787109 C-111.77231445 382.44445312 -111.77231445 382.44445312 -110.52954102 381.29833984 C-94.44490702 366.00017849 -82.10002021 345.13580125 -73.99047852 324.56787109 C-73.99047852 323.90787109 -73.99047852 323.24787109 -73.99047852 322.56787109 C-100.06047852 322.56787109 -126.13047852 322.56787109 -152.99047852 322.56787109 Z M-48.99047852 322.56787109 C-51.96047852 329.49787109 -54.93047852 336.42787109 -57.99047852 343.56787109 C-59.73492058 347.22837823 -61.46365678 350.8118181 -63.36547852 354.38037109 C-63.82116211 355.24017578 -64.2768457 356.09998047 -64.74633789 356.98583984 C-71.99066262 370.38138132 -80.91779136 382.18982603 -90.99047852 393.56787109 C-90.33047852 393.89787109 -89.67047852 394.22787109 -88.99047852 394.56787109 C-86.15160315 393.57349745 -83.43672937 392.50467317 -80.67797852 391.31787109 C-79.83783203 390.95870605 -78.99768555 390.59954102 -78.13208008 390.22949219 C-51.25546453 378.50755742 -28.08819926 362.83768913 -6.99047852 342.56787109 C-6.07008789 341.68873047 -5.14969727 340.80958984 -4.20141602 339.90380859 C1.00762989 334.82066108 5.87507641 329.57787569 10.00952148 323.56787109 C10.00952148 323.23787109 10.00952148 322.90787109 10.00952148 322.56787109 C-9.46047852 322.56787109 -28.93047852 322.56787109 -48.99047852 322.56787109 Z"
        fill="currentColor" 
        transform="translate(419.990478515625,72.43212890625)"
      />
    </svg>
  )
}


const Pointer = () => {
  return (
    <svg 
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    preserveAspectRatio="xMidYMid meet" className="w-4 h-4 shrink 0">
    
   
   <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
   fill="#000000" stroke="none">
   <path d="M2360 5109 c-202 -23 -396 -80 -585 -173 -376 -185 -656 -466 -835
   -839 -326 -676 -210 -1403 383 -2397 169 -283 326 -517 722 -1075 132 -187
   279 -396 327 -465 90 -131 124 -160 188 -160 64 0 98 29 188 160 48 69 195
   278 327 465 388 546 559 801 724 1079 533 897 674 1550 470 2181 -38 117 -141
   326 -218 440 -368 550 -1033 858 -1691 784z m495 -319 c681 -143 1170 -714
   1202 -1405 16 -333 -84 -701 -317 -1165 -183 -365 -385 -682 -920 -1438 -140
   -199 -257 -361 -260 -361 -3 0 -31 37 -62 82 -31 45 -154 219 -273 387 -236
   332 -471 679 -582 860 -415 676 -601 1199 -580 1635 26 547 334 1023 827 1274
   150 77 311 126 490 151 106 15 361 4 475 -20z"/>
   <path d="M2380 4201 c-339 -74 -601 -323 -691 -656 -18 -65 -22 -107 -22 -225
   0 -118 4 -160 22 -225 88 -324 340 -570 668 -652 103 -26 323 -23 428 6 317
   85 560 329 646 646 18 65 22 107 22 225 0 118 -4 160 -22 225 -86 318 -332
   564 -646 646 -116 30 -294 35 -405 10z m324 -301 c113 -29 190 -73 276 -160
   87 -86 131 -163 160 -276 36 -141 17 -295 -52 -427 -44 -82 -165 -203 -245
   -245 -133 -70 -286 -88 -427 -52 -111 28 -189 73 -276 160 -87 86 -131 162
   -160 276 -36 141 -18 294 52 427 42 80 163 201 245 245 132 70 286 88 427 52z"/>
   </g>
    </svg>
  );
};

const BADGE_COLORS = [
  { bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200' },
  { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  { bg: 'bg-sky-50',     text: 'text-sky-700',     border: 'border-sky-200' },
  { bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200' },
  { bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200' },
  { bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200' },
  { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200' },
  { bg: 'bg-lime-50',    text: 'text-lime-700',    border: 'border-lime-200' },
  { bg: 'bg-cyan-50',    text: 'text-cyan-700',    border: 'border-cyan-200' },
  { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200' },
  { bg: 'bg-yellow-50',  text: 'text-yellow-700',  border: 'border-yellow-200' },
  { bg: 'bg-green-50',   text: 'text-green-700',   border: 'border-green-200' },
  { bg: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200' },
  { bg: 'bg-indigo-50',  text: 'text-indigo-700',  border: 'border-indigo-200' },
  { bg: 'bg-purple-50',  text: 'text-purple-700',  border: 'border-purple-200' },
  { bg: 'bg-pink-50',    text: 'text-pink-700',    border: 'border-pink-200' },
  { bg: 'bg-slate-50',   text: 'text-slate-700',   border: 'border-slate-200' },
];

const TYPE_COLOR_MAP = {
  'nonprofit/volunteer':{ bg: 'bg-teal-100/60',  text: 'border-teal-700', border: 'border-teal-200' },
  'community/support service':   { bg: 'bg-amber-100/60', text: 'border-teal-700', border: 'border-amber-200' },
  'community event': { bg: 'bg-rose-100/60',  text: 'border-teal-700', border: 'border-rose-200' },
};

const typeColorFor = (value) => {
  const key = String(value).trim().toLowerCase();
  return TYPE_COLOR_MAP[key]
};

const hashString = (str = '') => {
  let h = 0;
  for (let i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; }
  return Math.abs(h);
};
const colorFor = (value) => BADGE_COLORS[hashString(String(value)) % BADGE_COLORS.length];

const getCity = (loc) => {
  if (!loc) return "";
  const parts = String(loc).split(",").map((s) => s.trim()).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  const last = parts[parts.length - 1];
  if (/^[A-Za-z]{2}$/.test(last)) return parts[parts.length - 2];
  return parts[0];
};

export default function Discover() {
  const [all, setAll] = useState([]);
  const [matched, setMatched] = useState([]);
  const [lastSwiped, setLastSwiped] = useState(null);
  const [passedIds, setPassedIds] = useState(() => new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const [cityFilter, setCityFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [nameQuery, setNameQuery] = useState("");

  const savedResources = pageNavigation((s) => s.savedResources);
  const addSaved = pageNavigation((s) => s.addSaved);
  const removeSaved = pageNavigation((s) => s.removeSaved);

  const topRef = useRef(null);
  const flingRef = useRef(null);
  const lockRef = useRef(false);
  const toppestRef = useRef(null);

  useScrollReveal(toppestRef, [isLoading]);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => { setAll(data); setIsLoading(false); })
      .catch((err) => { console.error("Failed to fetch resources:", err); setIsLoading(false); });
  }, []);

  const savedIds = useMemo(() => new Set(savedResources.map((r) => String(r.id))), [savedResources]);

  const cityOptions = useMemo(
    () => Array.from(new Set(all.map((e) => getCity(e.location)).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [all]
  );
  const categoryOptions = useMemo(
    () => Array.from(new Set(all.map((e) => e.tag).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [all]
  );
  const typeOptions = useMemo(
    () => Array.from(new Set(all.map((e) => e.type).filter(Boolean))).sort((a, b) => a.localeCompare(b)),
    [all]
  );

  const deck = useMemo(() => {
    const name = nameQuery.trim().toLowerCase();
    return all.filter((e) => {
      if (savedIds.has(String(e.id))) return false;
      if (passedIds.has(String(e.id))) return false;
      if (cityFilter && getCity(e.location) !== cityFilter) return false;
      if (categoryFilter && e.tag !== categoryFilter) return false;
      if (typeFilter && e.type !== typeFilter) return false;
      if (name && !(e.title || "").toLowerCase().includes(name)) return false;
      return true;
    });
  }, [all, savedIds, passedIds, cityFilter, categoryFilter, typeFilter, nameQuery]);

  const topCard = deck[deck.length - 1];
  const anyFilterActive = cityFilter || categoryFilter || typeFilter || nameQuery;

  const commitSwipe = useCallback((dir, item) => {
    setLastSwiped({ item, dir });
    if (dir === "right") {
      setMatched((m) => (m.some((x) => x.id === item.id) ? m : [...m, item]));
      addSaved(item);
    } else {
      setPassedIds((s) => new Set(s).add(String(item.id)));
    }
  }, [addSaved]);

  const undo = useCallback(() => {
    if (!lastSwiped) return;
    const { item, dir } = lastSwiped;
    if (dir === "right") {
      removeSaved(item.id);
      setMatched((m) => m.filter((x) => x.id !== item.id));
    } else {
      setPassedIds((s) => { const n = new Set(s); n.delete(String(item.id)); return n; });
    }
    setLastSwiped(null);
  }, [lastSwiped, removeSaved]);

  const reset = useCallback(() => {
    setPassedIds(new Set());
    setMatched([]);
    setLastSwiped(null);
  }, []);

  const clearFilters = () => {
    setCityFilter("");
    setCategoryFilter("");
    setTypeFilter("");
    setNameQuery("");
  };

  useLayoutEffect(() => {
    const el = topRef.current;
    if (!el || !topCard) return;

    const keepEl = el.querySelector('[data-stamp="keep"]');
    const passEl = el.querySelector('[data-stamp="pass"]');

    gsap.set(el, { x: 0, y: 0, rotation: 0, opacity: 1, borderColor: "#286A6C" });
    gsap.set([keepEl, passEl], { opacity: 0 });
    lockRef.current = false;

    const drag = Draggable.create(el, {
      type: "x,y",
      onDrag() {
        gsap.set(el, {
          rotation: this.x / 14,
          borderColor:
            this.x > TINT_THRESHOLD ? "#2F6B4F"
            : this.x < -TINT_THRESHOLD ? "#C2603A"
            : "#286A6C",
        });
        gsap.set(keepEl, { opacity: this.x > TINT_THRESHOLD ? 1 : 0 });
        gsap.set(passEl, { opacity: this.x < -TINT_THRESHOLD ? 1 : 0 });
      },
      onDragEnd() {
        if (this.x > SWIPE_THRESHOLD) fling("right");
        else if (this.x < -SWIPE_THRESHOLD) fling("left");
        else snapBack();
      },
    })[0];

    const fling = (dir) => {
      if (lockRef.current) return;
      lockRef.current = true;
      drag.disable();
      gsap.to(el, {
        x: dir === "right" ? 600 : -600,
        rotation: dir === "right" ? 30 : -30,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => commitSwipe(dir, topCard),
      });
    };

    const snapBack = () => {
      gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 0.4, ease: "power3.out" });
      gsap.to([keepEl, passEl], { opacity: 0, duration: 0.2 });
      gsap.set(el, { borderColor: "#286A6C" });
    };

    flingRef.current = fling;
    return () => drag.kill();
  }, [topCard?.id, commitSwipe]);

  return (
    <section id="discover" ref={toppestRef}>
      <div className="discover-header" data-reveal="">
          <h1 className="discover-title" data-reveal="">Swipe and Discover <span className="text-[#286A6C]" data-reveal=""> Your Match</span></h1>
          <p className="discover-subtitle" data-reveal="">Swipe right to keep an opportunity, left to pass.</p>
        </div>
      <div className="discover-inner">

        {isLoading ? (
          <div className="discover-loading">
            <div className="discover-spinner" />
            <p className="discover-loading-text">Loading resources</p>
          </div>
        ) : (
          <>
            {all.length > 0 && (
              <div className="discover-filters" data-reveal="">
                <div className="discover-filter-selects">
                  <div className="discover-field">
                    <label className="discover-label">City</label>
                    <select className="discover-select" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                      <option value="">All cities</option>
                      {cityOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="discover-field">
                    <label className="discover-label">Category</label>
                    <select className="discover-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
                      <option value="">All categories</option>
                      {categoryOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="discover-field">
                    <label className="discover-label">Type</label>
                    <select className="discover-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                      <option value="">All types</option>
                      {typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <label className="discover-label">Name</label>
                <input
                  type="text"
                  className="discover-input"
                  placeholder="Search by name"
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                />
                <div className="discover-filter-meta">
                  <span><span className="discover-count">{deck.length}</span> to swipe</span>
                  {anyFilterActive && (
                    <button onClick={clearFilters} className="discover-clear">Clear</button>
                  )}
                </div>
              </div>
            )}

            {deck.length === 0 ? (
              anyFilterActive ? (
                <div className="discover-nomatch">
                  <div className="discover-nomatch-emoji">🔍</div>
                  <h3 className="discover-nomatch-title">Nothing matches those filters</h3>
                  <p className="discover-nomatch-text">Try a different city, category, or type.</p>
                  <button onClick={clearFilters} className="discover-nomatch-btn">Clear filters</button>
                </div>
              ) : (
                <EndScreen count={matched.length} onReset={reset} data-reveal="" />
              )
            ) : (
              <>
                <CardStack deck={deck} topRef={topRef} onView={setExpanded} data-reveal=""/>
                <Controls
                  onSkip={() => flingRef.current?.("left")}
                  onSave={() => flingRef.current?.("right")}
                  onUndo={undo}
                  canUndo={!!lastSwiped}
                  data-reveal=""
                />
              </>
            )}
          </>
        )}
      </div>

      <ExpandedCard card={expanded} onClose={() => setExpanded(null)} />
    </section>
  );
}

function CardStack({ deck, topRef, onView }) {
  const visible = deck.slice(-4);

  return (
    <div className="discover-stack">
      {visible.map((o, i) => {
        const depth = visible.length - 1 - i;
        const isTop = depth === 0;
        const lift = Math.min(depth, 2);
        const z = depth === 0 ? "z-30" : depth === 1 ? "z-20" : "z-10";
        const pose = depth === 0 ? "" : lift === 1 ? "scale-[0.965] translate-y-3" : "scale-[0.93] translate-y-6";
        const typeColor = typeColorFor(o.type);
        const tagColor = colorFor(o.tag);

        return (
          <article
            key={o.id}
            ref={isTop ? topRef : null}
            className={`discover-card ${isTop ? "is-top" : "is-under"} ${z} ${pose}`}
          >
            <img
              src={o.img_url}
              alt={o.title}
              className="discover-card-img"
              onError={(e) => (e.target.src = "https://placehold.co/800x500/e2e8f0/475569?text=Image+Not+Found")}
            />
            {o.type && (
              <div className="discover-type-badge">
                <span className={`discover-type-pill ${typeColor.bg} ${typeColor.text} ${typeColor.border}`}>{o.type}</span>
              </div>
            )}

            <div className="discover-card-overlay">
              <div className="discover-card-panel">
                <div className="discover-card-head">
                  <h2 className="discover-card-title">{o.title}</h2>
                  {o.tag && (
                    <span className={`discover-card-tag ${tagColor.bg} ${tagColor.text} ${tagColor.border}`}>{o.tag}</span>
                  )}
                </div>

                <div className="discover-card-meta">
                  <div className="discover-card-org">{o.org}</div>
                  <dl className="discover-card-metarow">
                    <Pointer/> {o.location}
                  </dl>
                  <a className="discover-card-link" href={o.link} onClick={(e) => e.stopPropagation()}>
                      <Web/> {o.link}
                  </a>
                  <div className="discover-card-descwrap">
                    <p className="discover-card-desc">{o.description}</p>
                    <hr className="w-full" />
                  </div>
                </div>

                <div className="discover-card-actions">
                  <button
                    className="discover-card-btn"
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => { e.stopPropagation(); onView(o); }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>

            <span data-stamp="keep" className="discover-stamp keep">Keep</span>
            <span data-stamp="pass" className="discover-stamp pass">Pass</span>
          </article>
        );
      })}
    </div>
  );
}

function Meta({ icon, children }) {
  return (
    <dd className="discover-meta"><span aria-hidden>{icon}</span>{children}</dd>
  );
}

function Controls({ onSkip, onSave, onUndo, canUndo }) {
  return (
    <div className="discover-controls">
      <div className="discover-control">
        <button onClick={onSkip} aria-label="Pass" className="discover-round discover-round--pass">✕</button>
        <span className="discover-control-label discover-label--pass">Pass</span>
      </div>
      <div className="discover-control">
        <button onClick={onUndo} aria-label="Undo last" disabled={!canUndo} className="discover-round discover-round--undo">↻</button>
        <span className={`discover-control-label discover-label--undo ${canUndo ? "" : "is-off"}`}>Undo</span>
      </div>
      <div className="discover-control">
        <button onClick={onSave} aria-label="Keep" className="discover-round discover-round--keep">♥</button>
        <span className="discover-control-label discover-label--keep">Keep</span>
      </div>
    </div>
  );
}

function EndScreen({ count, onReset }) {
  return (
    <div className="discover-end">
      <div className="discover-end-emoji">🌻</div>
      <h3 className="discover-end-title">That&apos;s the whole stack</h3>
      <p className="discover-end-text">
        You kept <span className="discover-end-num">{count}</span>{" "}
        {count === 1 ? "opportunity" : "opportunities"}.
      </p>
      <button onClick={onReset} className="discover-end-btn">Browse again</button>
    </div>
  );
}