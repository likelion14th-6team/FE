import mochiDefault from '../assets/images/mochi-default.png';
import mochiExcited from '../assets/images/mochi-excited.png';
import mochiSad from '../assets/images/mochi-sad.png';
import mochiMain from '../assets/images/mochi-main.png';
import mochiReport from '../assets/images/mochi-report.png';

/** webpack import — 빌드 시 번들에 포함되어 경로 깨짐 방지 */
export const MOCHI_IMAGES = {
  default: mochiDefault,
  happy_wave: mochiDefault,
  smile: mochiDefault,
  neutral: mochiDefault,
  rest: mochiDefault,
  excited: mochiExcited,
  sad: mochiSad,
  sleeping: mochiSad,
  thinking: mochiReport,
  summary: mochiMain,
  main: mochiMain,
  report: mochiReport,
};
